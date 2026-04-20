import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { ApiResponse } from "@/lib/apiResponse";
import { DatabaseError, BadRequestError } from "@/lib/errors";
import { parsePagination, parseSort, parseSearch } from "@/lib/backendUtils";

// Force dynamic rendering for API routes
export const dynamic = "force-dynamic";

/**
 * GET /api/blog
 * Get all posts with pagination, sorting, and search
 */
export const GET = async (request) => {
  try {
    await connectToDb();

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const pagination = parsePagination(searchParams);
    const sort = parseSort(searchParams, "-createdAt");
    const searchQuery = parseSearch(searchParams, ["title", "desc"]);

    // Build query
    const query = { status: "published" };
    if (Object.keys(searchQuery).length > 0) {
      query.$text = { $search: searchParams.get("search") };
    }

    // Execute query
    const [posts, total] = await Promise.all([
      Post.find(query)
        .sort(sort)
        .limit(pagination.limit)
        .skip(pagination.skip)
        .populate("userId", "username img")
        .lean(),
      Post.countDocuments(query),
    ]);

    return ApiResponse.success(
      posts,
      "Posts fetched successfully",
      {
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          totalPages: Math.ceil(total / pagination.limit),
          hasNext: pagination.page * pagination.limit < total,
          hasPrev: pagination.page > 1,
        },
      }
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    
    if (error instanceof BadRequestError) {
      return ApiResponse.badRequest(error.message);
    }
    
    return ApiResponse.error(
      new DatabaseError("Failed to fetch posts"),
      500
    );
  }
};
