import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "User does not have a token" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not configured");

      return res.status(500).json({
        message: "Authentication configuration error",
      });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    // ensure the decoded token contains the expected user ID
    if (typeof verifyToken === "string" || !verifyToken) {
      return res
        .status(401)
        .json({ message: "User does not have a valid token" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default isAuth;
