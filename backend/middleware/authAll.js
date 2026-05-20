const jwt = require("jsonwebtoken");

const authAll = (req, res, next) => {
  try {

    // CHECK ALL TOKENS
    const token =
      req.cookies.adminToken ||
      req.cookies.clientToken ||
      req.cookies.customerToken;

    if (!token) {
      return res.status(401).json({
        message: "No token found",
      });
    }

    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    req.user = decoded;

    console.log("AUTH USER:", req.user);

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({
      message: "Invalid token",
    });

  }
};

module.exports = authAll;