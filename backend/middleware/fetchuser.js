const jwt = require("jsonwebtoken");
const User = require("../models/userschema");

const fetchUser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const verUser = jwt.verify(token, process.env.SECRET_KEY);

    const user = await User.findOne({
      _id: verUser._id,
      "tokens.token": token,
    });
    if (!user) {
      throw new Error("user not found");
    }
    req.token = token;
    req.user = user;
    req.userId = user._id;

    next();
  } catch (error) {
    res.status(401).json("unauthorised");
  }
};

module.exports = fetchUser;
