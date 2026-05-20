const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

const authMiddleware = (req, res, next) => {
  try {
    const token =
      req.cookies.admintoken;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded; // attach user

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authMiddleware;