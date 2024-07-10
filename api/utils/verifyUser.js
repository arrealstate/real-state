import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const accessForAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new errorHandler(403, "Access denied. Only admins can perform this action."));
  }
  next();
};

export const accessForAll = (req, res, next) => {
  if (false) {
    return next(new errorHandler(403, "Access denied. Only admins can perform this action."));
  }
  next();
};

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  
  if (!token) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: 'Unauthorized: No token provided',
    });
  }

  jwt.verify(token, 'Yasmeenmsa', (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        statusCode: 403,
        message: 'Forbidden: Invalid token',
      });
    }

    req.user = user;
    next();
  });
};

export const  verifyNoToken = (req, res, next) => {
    req.user = user;
    next();
};