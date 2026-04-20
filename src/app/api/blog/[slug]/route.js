import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { ApiResponse } from "@/lib/apiResponse";
import { DatabaseError, NotFoundError, BadRequestError } from "@/lib/errors";

// Force dynamic rendering for API routes
export const dynamic = "force-dynamic";

/**
 * GET /api/blog/[slug]
 * Get a single post by slug
 */
export const GET = async (request, { params }) => {
  try {
    await connectToDb();
    
    const { slug } = params;
    
    if (!slug) {
      return ApiResponse.badRequest("Slug is required");
    }

    const post = await Post.findOne({ slug, status: "published" })
      .populate("userId", "username email img")
      .lean();

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    // Increment view count (async, don't wait)
    post.views = (post.views || 0) + 1;
    await Post.updateOne({ slug }, { $inc: { views: 1 } });

    return ApiResponse.success(post, "Post fetched successfully");
  } catch (error) {
    console.error("Error fetching post:", error);
    
    if (error instanceof NotFoundError) {
      return ApiResponse.notFound(error.message);
    }
    
    if (error instanceof BadRequestError) {
      return ApiResponse.badRequest(error.message);
    }
    
    return ApiResponse.error(
      new DatabaseError("Failed to fetch post"),
      500
    );
  }
};

/**
 * DELETE /api/blog/[slug]
 * Delete a post by slug (admin only)
 */
export const DELETE = async (request, { params }) => {
  try {
    await connectToDb();
    
    const { slug } = params;
    
    if (!slug) {
      return ApiResponse.badRequest("Slug is required");
    }

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return ApiResponse.notFound("Post not found");
    }

    return ApiResponse.success(
      { slug: post.slug },
      "Post deleted successfully"
    );
  } catch (error) {
    console.error("Error deleting post:", error);
    
    if (error instanceof BadRequestError) {
      return ApiResponse.badRequest(error.message);
    }
    
    return ApiResponse.error(
      new DatabaseError("Failed to delete post"),
      500
    );
  }
};
