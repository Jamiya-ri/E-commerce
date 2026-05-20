const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

const authCustomer = (req, res, next) => {
  try {

    // ✅ GET CUSTOMER TOKEN ONLY
    const token = req.cookies.customerToken;

    console.log("CUSTOMER TOKEN:", token);

    // ✅ NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "No customer token",
      });
    }

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    console.log("CUSTOMER USER:", decoded);

    // ✅ SAVE USER
    req.user = decoded;

    next();

  } catch (err) {

    console.log("CUSTOMER AUTH ERROR:", err);

    return res.status(401).json({
      message: "Invalid customer token",
    });

  }
};

module.exports = authCustomer;