"use server";

import { revalidatePath } from "next/cache";
import { Post, User, Inquiry } from "./models";
import { connectToDb } from "./utils";
import { auth, signIn, signOut } from "./auth";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema, postSchema, userSchema } from "./validations";
import { hashPassword } from "./backendUtils";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Helper to check if current user is the demo account
 */
const checkDemoProtection = async () => {
  const session = await auth();
  if (session?.user?.username === "admin_demo") {
    throw new Error("Action disabled in Demo Mode. Create your own account for full access.");
  }
  return session;
};

/**
 * Register a new user (Public Registration)
 */
export const register = async (previousState, formData) => {
  const { username, email, password, img, passwordRepeat } =
    Object.fromEntries(formData);

  try {
    // Prevent registering with reserved demo username
    if (username.toLowerCase() === "admin_demo") {
      return { error: "This username is reserved for system use." };
    }
    
    // Validate input
    const validated = registerSchema.safeParse({
      username,
      email,
      password,
      passwordRepeat,
      img: img || "",
      isAdmin: "false", // Hardcoded to false for public safety
    });

    if (!validated.success) {
      return { error: validated.error.errors[0].message };
    }

    // Connect to database
    console.log("Connecting to DB...");
    await connectToDb();
    console.log("DB connected successfully");

    // Check if username already exists
    console.log("Checking for existing user:", username);
    const existingUser = await User.findOne({ username: username.toLowerCase() });
    if (existingUser) {
      return { error: "Username already exists" };
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail) {
      return { error: "Email already exists" };
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new user
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      img: img || "",
      isAdmin: isAdmin === "true",
      provider: "credentials",
    });

    await newUser.save();
    console.log("✓ User registered successfully:", username);

    // Sync previous guest inquiries with the same email to this new user
    try {
      await Inquiry.updateMany(
        { email: email.toLowerCase(), userId: null },
        { userId: newUser._id }
      );
      console.log("✓ Linked previous guest inquiries to new user.");
    } catch (syncErr) {
      console.warn("Could not sync previous inquiries:", syncErr);
    }

    return { success: true };
  } catch (error) {
    console.error("❌ Error registering user (DETAILED):", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return { error: `Registration failed: ${error.message}` };
  }
};

/**
 * Login user
 */
export const login = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    const validated = loginSchema.safeParse({ username, password });
    if (!validated.success) {
      return { error: validated.error.errors[0].message };
    }

    await signIn("credentials", { username, password });
  } catch (err) {
    // In Next.js, the redirect exception must be re-thrown to actually perform the redirect
    if (err.message?.includes("NEXT_REDIRECT")) {
      throw err;
    }

    if (err.type === "CredentialsSignin" || err.message?.includes("CredentialsSignin")) {
      return { error: "Invalid username or password" };
    }
    
    console.error("❌ Login action error:", err.message);
    return { error: "Something went wrong. Please check your connection." };
  }
};

/**
 * Add a new post
 */
export const addPost = async (prevState, formData) => {
  try {
    await checkDemoProtection();
    const validatedFields = postSchema.safeParse({
      title: formData.get("title"),
      slug: formData.get("slug"),
      desc: formData.get("desc"),
      userId: formData.get("userId"),
      img: formData.get("img"),
    });

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })) || [];
      
      return { error: errors[0]?.message || "Validation failed" };
    }

    const { title, desc, slug, userId, img } = validatedFields.data;

    await connectToDb();

    const existingPost = await Post.findOne({ slug });
    if (existingPost) {
      return { error: "A post with this slug already exists" };
    }

    let imgPath = "";
    if (img && img.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
      if (!allowedTypes.includes(img.type)) {
        return { error: "Invalid file type" };
      }
      if (img.size > 5 * 1024 * 1024) {
        return { error: "File size must be less than 5MB" };
      }
      
      try {
        const arrayBuffer = await img.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        
        // Upload to Cloudinary
        const uploadResponse = await new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { resource_type: "image", folder: "nextjs-agency" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          ).end(buffer);
        });
        
        imgPath = uploadResponse.secure_url;
      } catch (err) {
        console.error("❌ Failed to upload to Cloudinary:", err);
        return { error: `Cloudinary Error: ${err.message || "Unknown upload error"}` };
      }
    }

    const newPost = new Post({ title, desc, slug, userId, img: imgPath });
    await newPost.save();
    
    revalidatePath("/blog");
    revalidatePath("/admin");

    return { success: true, message: "Post created successfully" };
  } catch (error) {
    console.error("❌ Error creating post:", error);
    return { error: error.message || "Failed to create post" };
  }
};

/**
 * Delete a post
 */
export const deletePost = async (formData) => {
  try {
    await checkDemoProtection();
    await connectToDb();
    await Post.findByIdAndDelete(formData.get("id"));
    revalidatePath("/blog");
    revalidatePath("/admin");
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return { error: "Failed to delete post" };
  }
};

/**
 * Add a new user
 */
export const addUser = async (prevState, formData) => {
  try {
    await checkDemoProtection();
    const validatedFields = userSchema.safeParse({
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
      img: formData.get("img"),
      isAdmin: formData.get("isAdmin"),
    });

    if (!validatedFields.success) {
      const errors = validatedFields.error.errors?.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })) || [];
      
      return { error: errors[0]?.message || "Validation failed" };
    }

    const { username, email, password, img, isAdmin } = validatedFields.data;

    await connectToDb();

    if (await User.findOne({ username })) {
      return { error: "Username already exists" };
    }

    if (await User.findOne({ email })) {
      return { error: "Email already exists" };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img: img || "",
      isAdmin: isAdmin === "true",
      provider: "credentials",
    });

    await newUser.save();
    revalidatePath("/admin");

    return { success: true, message: "User created successfully" };
  } catch (error) {
    console.error("❌ Error creating user:", error);
    return { error: error.message || "Failed to create user" };
  }
};

/**
 * Delete a user
 */
export const deleteUser = async (formData) => {
  try {
    await checkDemoProtection();
    await connectToDb();
    const user = await User.findById(formData.get("id"));
    
    if (!user) {
      return { error: "User not found" };
    }
    
    if (user.isAdmin) {
      return { error: "Cannot delete admin users" };
    }

    await Post.deleteMany({ userId: user._id });
    await User.findByIdAndDelete(user._id);
    revalidatePath("/admin");

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    return { error: "Failed to delete user" };
  }
};

/**
 * Send a new inquiry/idea
 */
export const sendInquiry = async (prevState, formData) => {
  const { name, email, phone, message, userId } = Object.fromEntries(formData);

  try {
    await connectToDb();
    const newInquiry = new Inquiry({ 
      name, 
      email, 
      phone, 
      message, 
      userId: userId && userId !== "undefined" ? userId : null 
    });
    await newInquiry.save();
    console.log("✓ Inquiry saved successfully");
    revalidatePath("/workspace");
    return { success: true };
  } catch (error) {
    console.error("❌ Error saving inquiry:", error);
    return { error: "Failed to send message" };
  }
};

/**
 * Update inquiry status
 */
export const updateInquiryStatus = async (formData) => {
  const id = formData.get("id");
  const status = formData.get("status");

  try {
    await checkDemoProtection();
    await connectToDb();
    await Inquiry.findByIdAndUpdate(id, { status });
    revalidatePath("/admin");
    revalidatePath("/workspace");
    return { success: true };
  } catch (error) {
    console.error("❌ Error updating status:", error);
    return { error: "Failed to update status" };
  }
};

/**
 * Delete an inquiry
 */
export const deleteInquiry = async (formData) => {
  const id = formData.get("id");

  try {
    await checkDemoProtection();
    await connectToDb();
    await Inquiry.findByIdAndDelete(id);
    revalidatePath("/admin");
    revalidatePath("/workspace");
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting inquiry:", error);
    return { error: "Failed to delete message" };
  }
};

/**
 * Handle logout
 */
export const handleLogout = async () => {
  "use server";
  await signOut({ redirectTo: "/" });
};
