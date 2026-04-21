export const protect = (req, res, next) => {
  const userId = req.headers.userid;

  if (!userId) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  req.userId = userId;
  next();
};