const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
  const accesToken = req.header("accesToken");
  if (!accesToken) return res.json({ err: "User Not loged in" });
  try {
    const validToken = verify(accesToken, "SecretKey");

    if (validToken) return next();
  } catch (error) {
    return res.json({ err: error });
  }
};

module.exports = { validateToken };
