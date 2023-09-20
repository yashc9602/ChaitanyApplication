const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET = process.env.SECRET;

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      // Modify this line to include the user ID, assuming user ID is present in the token payload
      req.user = { id: user.id, ...user };
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { authenticateJwt, SECRET };
