/**
 * Standardized API response helper functions
 * Ensures consistent response format across all endpoints
 */

/**
 * Send a success response
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {number} statusCode - HTTP status code (default: 200)
 * @param {string} message - Optional success message
 */
export const sendSuccess = (res, data, statusCode = 200, message = null) => {
  const response = {
    success: true,
    data,
  };
  
  if (message) {
    response.message = message;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Send an error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {*} errors - Optional detailed errors
 */
export const sendError = (res, message, statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };
  
  if (errors) {
    response.errors = errors;
  }
  
  return res.status(statusCode).json(response);
};

/**
 * Send a validation error response
 * @param {Object} res - Express response object
 * @param {Array|Object} errors - Validation errors
 * @param {string} message - Optional custom message
 */
export const sendValidationError = (res, errors, message = 'Validation failed') => {
  return sendError(res, message, 400, errors);
};

/**
 * Send a not found error response
 * @param {Object} res - Express response object
 * @param {string} resource - Name of the resource not found
 */
export const sendNotFound = (res, resource = 'Resource') => {
  return sendError(res, `${resource} not found`, 404);
};

/**
 * Send an unauthorized error response
 * @param {Object} res - Express response object
 * @param {string} message - Optional custom message
 */
export const sendUnauthorized = (res, message = 'Unauthorized') => {
  return sendError(res, message, 401);
};

/**
 * Send a forbidden error response
 * @param {Object} res - Express response object
 * @param {string} message - Optional custom message
 */
export const sendForbidden = (res, message = 'Forbidden') => {
  return sendError(res, message, 403);
};

/**
 * Send a created response (201)
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Optional success message
 */
export const sendCreated = (res, data, message = null) => {
  return sendSuccess(res, data, 201, message);
};

/**
 * Send a no content response (204)
 * @param {Object} res - Express response object
 */
export const sendNoContent = (res) => {
  return res.status(204).send();
};

/**
 * Send a paginated success response
 * Wraps list data with pagination metadata for consistent API responses
 * @param {Object} res - Express response object
 * @param {Array} data - Array of records for the current page
 * @param {number} total - Total number of records across all pages
 * @param {number} page - Current page number (1-based)
 * @param {number} limit - Number of records per page
 * @param {string} message - Optional success message
 */
export const sendPaginated = (res, data, total, page, limit, message = null) => {
  const totalPages = Math.ceil(total / limit);
  const response = {
    success: true,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    },
  };

  if (message) {
    response.message = message;
  }

  return res.status(200).json(response);
};

export default {
  sendSuccess,
  sendError,
  sendValidationError,
  sendNotFound,
  sendUnauthorized,
  sendForbidden,
  sendCreated,
  sendNoContent,
  sendPaginated,
};
