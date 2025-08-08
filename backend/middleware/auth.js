import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userAuth = async (req, res, next) => {
  const {token} = req.headers;

  if (!token) {
    return res.status(401).json({ success: false, message: "Not authorized Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(decoded.id) {
req.user = { id: decoded.id }; // ✅ SAFE: always works
    }
    else{
      return res.status(401).json({ success: false, message: "Not authorized Login Again" });
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({ success: false, message: "Invalid token" });
  }
}

export default userAuth;