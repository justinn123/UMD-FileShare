import jwt from "jsonwebtoken";

export const requireAuth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // "Bearer <token>"

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const refreshToken = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({message: "No token provided"});

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const newToken = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      JWT_SECRET,
      {expiresIn : "1h"}
    );

    return res.json({
      token: newToken,
      user: { id: user._id, email: user.email, username: user.username }
    });
  } catch {
    return res.status(401).json({message: "Invalid or expired token"});
  }
}
