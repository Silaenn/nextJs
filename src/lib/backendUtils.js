import { customAlphabet } from 'nanoid';

/**
 * Generate a unique ID
 * @param {number} size - Size of the ID (default: 12)
 * @returns {string} Unique ID
 */
const nanoid = customAlphabet('1234567890abcdef', 12);

export const generateId = (size = 12) => nanoid(size);

/**
 * Generate a URL-friendly slug from a string
 * @param {string} text - Text to convert to slug
 * @returns {string} Slug
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Sanitize user input to prevent XSS
 * @param {string} str - String to sanitize
 * @returns {string} Sanitized string
 */
export const sanitizeInput = (str) => {
  if (!str) return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  const regex = /[&<>"'/]/g;
  return str.toString().replace(regex, (match) => map[match]);
};

/**
 * Sanitize HTML (basic sanitization)
 * @param {string} html - HTML to sanitize
 * @returns {string} Sanitized HTML
 */
export const sanitizeHtml = (html) => {
  if (!html) return '';
  
  // Remove script tags and their content
  let sanitized = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  
  // Remove event handlers
  sanitized = sanitized.replace(/ on\w+="[^"]*"/g, '');
  
  return sanitized;
};

/**
 * Hash a password (wrapper for bcrypt)
 * @param {string} password - Plain text password
 * @param {number} saltRounds - Number of salt rounds (default: 10)
 * @returns {Promise<string>} Hashed password
 */
export const hashPassword = async (password, saltRounds = 10) => {
  const bcrypt = await import('bcryptjs');
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} Match result
 */
export const comparePassword = async (password, hash) => {
  const bcrypt = await import('bcryptjs');
  return bcrypt.compare(password, hash);
};

/**
 * Parse pagination query parameters
 * @param {URLSearchParams} searchParams - Query parameters
 * @returns {Object} Pagination object
 */
export const parsePagination = (searchParams) => {
  const page = parseInt(searchParams?.get('page') || '1', 10);
  const limit = parseInt(searchParams?.get('limit') || '10', 10);
  const skip = (page - 1) * limit;
  
  return {
    page: Math.max(1, page),
    limit: Math.min(100, Math.max(1, limit)),
    skip: Math.max(0, skip),
  };
};

/**
 * Parse sort query parameters
 * @param {URLSearchParams} searchParams - Query parameters
 * @param {string} defaultSort - Default sort field
 * @returns {Object} Sort object
 */
export const parseSort = (searchParams, defaultSort = '-createdAt') => {
  const sortBy = searchParams?.get('sortBy') || defaultSort;
  const sortOrder = sortBy.startsWith('-') ? -1 : 1;
  const sortField = sortBy.replace(/^-/, '');
  
  return { [sortField]: sortOrder };
};

/**
 * Parse search query parameters
 * @param {URLSearchParams} searchParams - Query parameters
 * @param {string[]} searchableFields - Fields to search in
 * @returns {Object} Search query object
 */
export const parseSearch = (searchParams, searchableFields = []) => {
  const search = searchParams?.get('search');
  
  if (!search || searchableFields.length === 0) {
    return {};
  }
  
  const searchQuery = {
    $or: searchableFields.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    })),
  };
  
  return searchQuery;
};

/**
 * Format file size to human-readable format
 * @param {number} bytes - Size in bytes
 * @returns {string} Formatted size
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate file type
 * @param {string} mimeType - MIME type of the file
 * @param {string[]} allowedTypes - Allowed MIME types
 * @returns {boolean} Is valid
 */
export const isValidFileType = (mimeType, allowedTypes) => {
  return allowedTypes.includes(mimeType);
};

/**
 * Get IP address from request
 * @param {Request} request - Next.js request object
 * @returns {string} IP address
 */
export const getIpAddress = (request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
};

/**
 * Get user agent from request
 * @param {Request} request - Next.js request object
 * @returns {string} User agent
 */
export const getUserAgent = (request) => {
  return request.headers.get('user-agent') || 'Unknown';
};

/**
 * Delay execution for specified milliseconds
 * @param {number} ms - Milliseconds to delay
 * @returns {Promise<void>}
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Retry a function with exponential backoff
 * @param {Function} fn - Function to retry
 * @param {number} retries - Number of retries
 * @param {number} delay - Initial delay in ms
 * @returns {Promise<any>}
 */
export const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) {
      throw error;
    }
    await delay(delay);
    return retryWithBackoff(fn, retries - 1, delay * 2);
  }
};
