const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded._id;
    next();
  } catch (error) {
    res.status(401).json({ status: false, message: "Invalid token" });
  }
};
module.exports = verifyToken;