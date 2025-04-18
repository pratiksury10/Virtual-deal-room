const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization && req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded =>", decoded); // 👀 Debug here
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Token invalid" });
  }
}
module.exports = { protect };
