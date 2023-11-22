const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists..

  if (token) {
    jwt.verify(token, "siddhart hk 8087");
  } else {
    res.redirect("/login");
  }
};
