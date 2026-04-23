import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json("No token ❌");
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json("Invalid token ❌");
    }

    const decoded = jwt.verify(token, "secret");

    req.user = decoded;

    next();

  } catch (err) {
    res.status(401).json("Unauthorized ❌");
  }
}