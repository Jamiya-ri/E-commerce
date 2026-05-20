const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

const authClient = (req, res, next) => {
  try {

    // ✅ CLIENT TOKEN ONLY
    const token = req.cookies.clientToken;

    console.log("CLIENT TOKEN:", token);

    // ✅ NO TOKEN
    if (!token) {
      return res.status(401).json({
        message: "No client token",
      });
    }

    // ✅ VERIFY TOKEN
    const decoded = jwt.verify(
      token,
      JWT_SECRET
    );

    console.log("CLIENT USER:", decoded);

    // ✅ SAVE USER
    req.user = decoded;

    next();

  } catch (err) {

    console.log("CLIENT AUTH ERROR:", err);

    return res.status(401).json({
      message: "Invalid client token",
    });

  }
};

module.exports = authClient;