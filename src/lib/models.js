import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username must be less than 20 characters"],
      trim: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: [50, "Email must be less than 50 characters"],
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: function() {
        // Password is required only if not using OAuth
        return !this.provider;
      },
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't return password by default
    },
    img: {
      type: String,
      default: "",
    },
    provider: {
      type: String,
      enum: ["github", "credentials"],
      default: "credentials",
    },
    // For GitHub OAuth compatibility
    image: {
      type: String,
      default: "",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastLogin: {
      type: Date,
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
userSchema.index({ username: 1, email: 1 });
userSchema.index({ createdAt: -1 });
userSchema.index({ isActive: 1 });

// Virtual for posts count
userSchema.virtual("postsCount", {
  ref: "Post",
  localField: "_id",
  foreignField: "userId",
  count: true,
});

// Pre-save hook to update lastLogin
userSchema.methods.updateLastLogin = async function() {
  this.lastLogin = new Date();
  await this.save();
};

// Instance method to check if user is admin
userSchema.methods.isAdminUser = function() {
  return this.isAdmin === true;
};

// Static method to find active users
userSchema.statics.findActive = function() {
  return this.find({ isActive: true });
};

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [3, "Title must be at least 3 characters"],
      maxlength: [100, "Title must be less than 100 characters"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [5000, "Description must be less than 5000 characters"],
      trim: true,
    },
    img: {
      type: String,
      default: "",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true, // Index for faster lookups
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase letters, numbers, and hyphens"],
    },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for better query performance
postSchema.index({ slug: 1 });
postSchema.index({ userId: 1, createdAt: -1 });
postSchema.index({ status: 1, createdAt: -1 });
postSchema.index({ title: "text", desc: "text" }); // Text index for search
postSchema.index({ tags: 1 });

// Virtual for author
postSchema.virtual("author", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

// Pre-save hook to ensure slug is unique
postSchema.pre("save", async function(next) {
  if (!this.isModified("slug")) {
    return next();
  }
  
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!slugRegex.test(this.slug)) {
    // Generate slug from title if invalid
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }
  
  // Check for duplicate slug
  const existingPost = await this.constructor.findOne({ 
    slug: this.slug,
    _id: { $ne: this._id }
  });
  
  if (existingPost) {
    // Append unique identifier
    this.slug = `${this.slug}-${Date.now()}`;
  }
  
  next();
});

// Instance method to increment views
postSchema.methods.incrementViews = async function() {
  this.views += 1;
  return this.save();
};

// Static method to find published posts
postSchema.statics.findPublished = function() {
  return this.find({ status: "published" });
};

// Static method to search posts
postSchema.statics.search = function(query) {
  return this.find({ $text: { $search: query } }, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } });
};

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["pending", "reviewed", "accepted"], default: "pending" },
  },
  { timestamps: true }
);

// Export models with proper initialization
export const User = mongoose.models?.User || mongoose.model("User", userSchema);
export const Post = mongoose.models?.Post || mongoose.model("Post", postSchema);
export const Inquiry = mongoose.models?.Inquiry || mongoose.model("Inquiry", inquirySchema);
