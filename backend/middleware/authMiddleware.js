const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

const authMiddleware =
(req, res, next) => {

  try {

    let token = null;

    // ADMIN
    if (req.cookies.adminToken) {

      token =
      req.cookies.adminToken;

    }

    // CLIENT
    else if (
      req.cookies.clientToken
    ) {

      token =
      req.cookies.clientToken;

    }

    // CUSTOMER
    else if (
      req.cookies.customerToken
    ) {

      token =
      req.cookies.customerToken;

    }

    // TOKEN ILLANA
    if (!token) {

      return res.status(401).json({

        message:
        "No token found",

      });

    }

    // VERIFY TOKEN
    const decoded =
    jwt.verify(
      token,
      JWT_SECRET
    );

    // USER SAVE
    req.user = decoded;

    console.log(decoded);

    next();

  } catch (err) {

    console.log(err);

    return res.status(401).json({

      message:
      "Invalid token",

    });

  }

};

module.exports =
authMiddleware;