import { NextResponse } from 'next/server';

/**
 * Standardized API response wrapper
 * Ensures consistent response format across all API endpoints
 */

export class ApiResponse {
  constructor(success, data = null, message = null, meta = {}) {
    this.success = success;
    this.data = data;
    this.message = message;
    this.meta = meta;
    this.timestamp = new Date().toISOString();
  }

  /**
   * Success response (200)
   */
  static success(data, message = 'Success', meta = {}) {
    const response = new ApiResponse(true, data, message, meta);
    return NextResponse.json(response, { status: 200 });
  }

  /**
   * Created response (201)
   */
  static created(data, message = 'Resource created successfully', meta = {}) {
    const response = new ApiResponse(true, data, message, meta);
    return NextResponse.json(response, { status: 201 });
  }

  /**
   * No content response (204)
   */
  static noContent() {
    return new NextResponse(null, { status: 204 });
  }

  /**
   * Error response
   */
  static error(error, statusCode = 500, meta = {}) {
    const response = new ApiResponse(
      false,
      null,
      error.message || 'An error occurred',
      {
        ...meta,
        code: error.code || 'ERROR',
      }
    );
    return NextResponse.json(response, { status: statusCode });
  }

  /**
   * Bad request response (400)
   */
  static badRequest(message = 'Bad request', errors = []) {
    const response = new ApiResponse(false, null, message, {
      errors,
      code: 'BAD_REQUEST',
    });
    return NextResponse.json(response, { status: 400 });
  }

  /**
   * Unauthorized response (401)
   */
  static unauthorized(message = 'Unauthorized') {
    const response = new ApiResponse(false, null, message, {
      code: 'UNAUTHORIZED',
    });
    return NextResponse.json(response, { status: 401 });
  }

  /**
   * Forbidden response (403)
   */
  static forbidden(message = 'Forbidden') {
    const response = new ApiResponse(false, null, message, {
      code: 'FORBIDDEN',
    });
    return NextResponse.json(response, { status: 403 });
  }

  /**
   * Not found response (404)
   */
  static notFound(message = 'Resource not found') {
    const response = new ApiResponse(false, null, message, {
      code: 'NOT_FOUND',
    });
    return NextResponse.json(response, { status: 404 });
  }

  /**
   * Conflict response (409)
   */
  static conflict(message = 'Resource already exists') {
    const response = new ApiResponse(false, null, message, {
      code: 'CONFLICT',
    });
    return NextResponse.json(response, { status: 409 });
  }

  /**
   * Rate limit response (429)
   */
  static rateLimit(message = 'Too many requests', retryAfter = 60) {
    const response = new ApiResponse(false, null, message, {
      code: 'RATE_LIMIT_EXCEEDED',
      retryAfter,
    });
    return NextResponse.json(response, {
      status: 429,
      headers: {
        'Retry-After': retryAfter.toString(),
      },
    });
  }
}

/**
 * Paginated response for lists
 */
export class PaginatedResponse extends ApiResponse {
  constructor(data, page, limit, total) {
    const meta = {
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
    super(true, data, 'Success', meta);
  }

  static create(data, page, limit, total) {
    const response = new PaginatedResponse(data, page, limit, total);
    return NextResponse.json(response, { status: 200 });
  }
}
