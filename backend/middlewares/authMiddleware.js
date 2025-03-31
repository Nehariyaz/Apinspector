const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  console.log("Headers:", req.headers);
  const authHeader = req.headers.authorization;
  console.log("token: ",authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized - Missing or invalid token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    req.userId = decoded.id; 
    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};

module.exports = { authMiddleware };