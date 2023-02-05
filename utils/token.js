const jwt = require("jsonwebtoken");
const currentError = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(currentError(401, "You are not authenticated"));
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, existingUser) => {
    if (err) return next(currentError(403, "Token is not valid"));
    req.existingUser = existingUser;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.existingUser.id === req.params.id || req.existingUser.isAdmin) {
      next();
    } else {
      if (err) {
        return next(currentError(403, "You are not authorized"));
      }
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.existingUser.isAdmin) {
      next();
    } else {
      if (err) {
        return next(currentError(403, "You are not authorized"));
      }
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
