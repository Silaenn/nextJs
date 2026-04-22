import { Post, User, Inquiry } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";
import { DatabaseError, NotFoundError } from "./errors";

/**
 * Get all posts with optional pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of posts
 */
export const getPosts = async (options = {}) => {
  try {
    await connectToDb();
    
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      search,
      status = "published",
    } = options;
    
    const query = {};
    
    // Add status filter
    if (status) {
      query.status = status;
    }
    
    // Add search filter
    if (search) {
      query.$text = { $search: search };
    }
    
    const posts = await Post.find(query)
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("userId", "username email img")
      .lean();
    
    return posts;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw new DatabaseError("Failed to fetch posts");
  }
};

/**
 * Get total post count
 * @param {Object} filter - Query filter
 * @returns {Promise<number>} Total count
 */
export const getPostCount = async (filter = {}) => {
  try {
    await connectToDb();
    return await Post.countDocuments(filter);
  } catch (error) {
    console.error("Error counting posts:", error);
    throw new DatabaseError("Failed to count posts");
  }
};

/**
 * Get a single post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object>} Post object
 */
export const getPost = async (slug) => {
  try {
    await connectToDb();
    
    const post = await Post.findOne({ slug })
      .populate("userId", "username email img")
      .lean();
    
    if (!post) {
      throw new NotFoundError("Post");
    }
    
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching post:", error);
    throw new DatabaseError("Failed to fetch post");
  }
};

/**
 * Get a single post by ID
 * @param {string} id - Post ID
 * @returns {Promise<Object>} Post object
 */
export const getPostById = async (id) => {
  try {
    await connectToDb();
    
    const post = await Post.findById(id)
      .populate("userId", "username email img")
      .lean();
    
    if (!post) {
      throw new NotFoundError("Post");
    }
    
    return post;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching post by ID:", error);
    throw new DatabaseError("Failed to fetch post");
  }
};

/**
 * Get a user by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User object
 */
export const getUser = async (id) => {
  try {
    await connectToDb();
    
    const user = await User.findById(id)
      .select("-password") // Exclude password
      .lean();
    
    if (!user) {
      throw new NotFoundError("User");
    }
    
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching user:", error);
    throw new DatabaseError("Failed to fetch user");
  }
};

/**
 * Get user by username
 * @param {string} username - Username
 * @returns {Promise<Object>} User object
 */
export const getUserByUsername = async (username) => {
  try {
    await connectToDb();
    
    const user = await User.findOne({ username })
      .select("-password")
      .lean();
    
    if (!user) {
      throw new NotFoundError("User");
    }
    
    return user;
  } catch (error) {
    if (error instanceof NotFoundError) {
      throw error;
    }
    console.error("Error fetching user by username:", error);
    throw new DatabaseError("Failed to fetch user");
  }
};

/**
 * Get all users with optional pagination
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of users
 */
export const getUsers = async (options = {}) => {
  try {
    await connectToDb();
    
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
      isActive = true,
    } = options;
    
    const users = await User.find({ isActive })
      .select("-password") // Exclude password
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new DatabaseError("Failed to fetch users");
  }
};

/**
 * Get user count
 * @param {Object} filter - Query filter
 * @returns {Promise<number>} Total count
 */
export const getUserCount = async (filter = {}) => {
  try {
    await connectToDb();
    return await User.countDocuments(filter);
  } catch (error) {
    console.error("Error counting users:", error);
    throw new DatabaseError("Failed to count users");
  }
};

/**
 * Get user's posts
 * @param {string} userId - User ID
 * @param {Object} options - Query options
 * @returns {Promise<Array>} Array of posts
 */
export const getUserPosts = async (userId, options = {}) => {
  try {
    await connectToDb();
    
    const {
      page = 1,
      limit = 10,
      sort = "-createdAt",
    } = options;
    
    const posts = await Post.find({ userId, status: "published" })
      .sort(sort)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    
    return posts;
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new DatabaseError("Failed to fetch user posts");
  }
};

/**
 * Get recent posts
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} Array of recent posts
 */
export const getRecentPosts = async (limit = 5) => {
  try {
    await connectToDb();
    
    const posts = await Post.find({ status: "published" })
      .sort("-createdAt")
      .limit(limit)
      .populate("userId", "username img")
      .lean();
    
    return posts;
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    throw new DatabaseError("Failed to fetch recent posts");
  }
};

/**
 * Get popular posts by views
 * @param {number} limit - Number of posts to fetch
 * @returns {Promise<Array>} Array of popular posts
 */
export const getPopularPosts = async (limit = 5) => {
  try {
    await connectToDb();
    
    const posts = await Post.find({ status: "published" })
      .sort("-views")
      .limit(limit)
      .populate("userId", "username img")
      .lean();
    
    return posts;
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    throw new DatabaseError("Failed to fetch popular posts");
  }
};

/**
 * Get inquiries for a specific user
 * @param {string} userId - User ID
 * @returns {Promise<Array>} Array of inquiries
 */
export const getInquiriesByUser = async (userId) => {
  noStore();
  try {
    await connectToDb();
    const inquiries = await Inquiry.find({ userId })
      .sort({ createdAt: -1 })
      .lean();
    return inquiries;
  } catch (error) {
    console.error("Error fetching user inquiries:", error);
    throw new DatabaseError("Failed to fetch your messages");
  }
};
