/**
 * In-memory rate limiter store
 * For production, use Redis or similar
 */
const rateLimitStore = new Map();

/**
 * Rate limiter configuration
 */
const rateLimitConfig = {
  // API routes: 100 requests per minute
  api: {
    windowMs: 60 * 1000, // 1 minute
    max: 100,
  },
  // Auth routes: 5 requests per minute (stricter for security)
  auth: {
    windowMs: 60 * 1000, // 1 minute
    max: 5,
  },
  // General routes: 1000 requests per minute
  general: {
    windowMs: 60 * 1000, // 1 minute
    max: 1000,
  },
};

/**
 * Clean up expired entries from store
 */
function cleanupStore() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.timestamp > 5 * 60 * 1000) {
      rateLimitStore.delete(key);
    }
  }
}

// Run cleanup every 5 minutes
setInterval(cleanupStore, 5 * 60 * 1000);

/**
 * Get rate limit config based on path
 * @param {string} path - Request path
 * @returns {Object} Rate limit config
 */
function getRateLimitConfig(path) {
  if (path.startsWith("/api/auth")) {
    return rateLimitConfig.auth;
  }
  if (path.startsWith("/api")) {
    return rateLimitConfig.api;
  }
  return rateLimitConfig.general;
}

/**
 * Rate limiter middleware
 * @param {Request} request - Next.js request object
 * @returns {Object} Rate limit result
 */
export function rateLimit(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path") || new URL(request.url).pathname;
  
  // Get client identifier (IP address or fallback)
  const forwarded = request.headers.get("x-forwarded-for");
  const clientId = forwarded
    ? forwarded.split(",")[0].trim()
    : request.headers.get("x-real-ip") || "unknown";
  
  const config = getRateLimitConfig(path);
  const key = `${path}:${clientId}`;
  const now = Date.now();
  
  // Get or create rate limit entry
  let entry = rateLimitStore.get(key);
  
  if (!entry) {
    entry = {
      count: 0,
      timestamp: now,
    };
  }
  
  // Reset if window has passed
  if (now - entry.timestamp > config.windowMs) {
    entry = {
      count: 0,
      timestamp: now,
    };
  }
  
  // Increment count
  entry.count += 1;
  rateLimitStore.set(key, entry);
  
  // Calculate remaining requests
  const remaining = Math.max(0, config.max - entry.count);
  const resetTime = entry.timestamp + config.windowMs;
  const retryAfter = Math.ceil((resetTime - now) / 1000);
  
  // Check if rate limit exceeded
  const isLimited = entry.count > config.max;
  
  return {
    isLimited,
    remaining,
    limit: config.max,
    resetTime,
    retryAfter,
    headers: {
      "X-RateLimit-Limit": config.max.toString(),
      "X-RateLimit-Remaining": remaining.toString(),
      "X-RateLimit-Reset": resetTime.toString(),
      ...(isLimited && { "Retry-After": retryAfter.toString() }),
    },
  };
}

/**
 * Check if request is rate limited
 * @param {Request} request - Next.js request object
 * @returns {Object|null} Rate limit response or null
 */
export function checkRateLimit(request) {
  const result = rateLimit(request);
  
  if (result.isLimited) {
    return {
      status: 429,
      headers: result.headers,
      body: {
        success: false,
        message: "Too many requests",
        code: "RATE_LIMIT_EXCEEDED",
        retryAfter: result.retryAfter,
      },
    };
  }
  
  return null;
}
