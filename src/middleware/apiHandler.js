import { NextResponse } from "next/server";
import { checkRateLimit } from "./rateLimit";
import { auth } from "@/lib/auth";
import { UnauthorizedError, ForbiddenError } from "./errors";

/**
 * Middleware options
 * @typedef {Object} MiddlewareOptions
 * @property {boolean} [requireAuth] - Require authentication
 * @property {boolean} [requireAdmin] - Require admin role
 * @property {boolean} [rateLimit] - Enable rate limiting
 * @property {string[]} [allowedMethods] - Allowed HTTP methods
 */

/**
 * Create API middleware handler
 * @param {Function} handler - API route handler
 * @param {MiddlewareOptions} options - Middleware options
 * @returns {Function} Wrapped handler
 */
export function createApiHandler(handler, options = {}) {
  const {
    requireAuth = false,
    requireAdmin = false,
    rateLimit: enableRateLimit = true,
    allowedMethods = ["GET"],
  } = options;

  return async (request, context) => {
    const { params } = context || {};

    // Check rate limiting
    if (enableRateLimit) {
      const rateLimitResponse = checkRateLimit(request);
      if (rateLimitResponse) {
        return NextResponse.json(rateLimitResponse.body, {
          status: rateLimitResponse.status,
          headers: rateLimitResponse.headers,
        });
      }
    }

    // Check allowed methods
    if (!allowedMethods.includes(request.method)) {
      return NextResponse.json(
        {
          success: false,
          message: `Method ${request.method} not allowed`,
          code: "METHOD_NOT_ALLOWED",
        },
        { status: 405 }
      );
    }

    // Check authentication
    if (requireAuth) {
      try {
        const session = await auth();
        
        if (!session?.user) {
          return NextResponse.json(
            {
              success: false,
              message: "Authentication required",
              code: "UNAUTHORIZED",
            },
            { status: 401 }
          );
        }

        // Attach user to request
        request.user = session.user;

        // Check admin role
        if (requireAdmin && !session.user.isAdmin) {
          return NextResponse.json(
            {
              success: false,
              message: "Admin access required",
              code: "FORBIDDEN",
            },
            { status: 403 }
          );
        }
      } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json(
          {
            success: false,
            message: "Authentication failed",
            code: "AUTH_ERROR",
          },
          { status: 500 }
        );
      }
    }

    // Call the actual handler
    try {
      return await handler(request, { params, user: request.user });
    } catch (error) {
      console.error("Handler error:", error);
      
      // Handle known errors
      if (error instanceof UnauthorizedError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            code: error.code,
          },
          { status: 401 }
        );
      }
      
      if (error instanceof ForbiddenError) {
        return NextResponse.json(
          {
            success: false,
            message: error.message,
            code: error.code,
          },
          { status: 403 }
        );
      }
      
      // Generic error
      return NextResponse.json(
        {
          success: false,
          message: "Internal server error",
          code: "INTERNAL_ERROR",
        },
        { status: 500 }
      );
    }
  };
}

/**
 * CORS headers helper
 * @param {string[]} allowedOrigins - Allowed origins
 * @returns {Object} CORS headers
 */
export function getCorsHeaders(allowedOrigins = ["*"]) {
  return {
    "Access-Control-Allow-Origin": allowedOrigins.join(", "),
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Credentials": "true",
  };
}

/**
 * Handle CORS preflight requests
 * @param {Request} request - Request object
 * @param {string[]} allowedOrigins - Allowed origins
 * @returns {NextResponse|null} CORS response or null
 */
export function handleCorsPreflight(request, allowedOrigins = ["*"]) {
  if (request.method === "OPTIONS") {
    return NextResponse.json({}, {
      status: 204,
      headers: getCorsHeaders(allowedOrigins),
    });
  }
  return null;
}
