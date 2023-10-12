const express = require("express");
const User = require("../models/userschema");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const fetchUser = require("../middleware/fetchuser");

const router = express.Router();

router.get("/about", fetchUser, (req, res) => {
  return res.status(200).json(req.user);
});

// contact us page login required

router.get("/getuser", fetchUser, (req, res) => {
  return res.status(200).json(req.user);
});

// send message to db login required

router.post(
  "/contactus",
  body("message", "Message must be contain 15 charecter").isLength({ min: 10 }),
  fetchUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array();
      return res.status(400).json({ error: message[0].msg });
    }
    const message = req.body.message;
    req.user.messages = req.user.messages.concat({ message });
    req.user.save();
    return res.status(200).json(req.user);
  }
);

//   Logout user
router.get("/signout", fetchUser, (req, res) => {
  req.user.tokens = req.user.tokens.filter((curElement) => {
    return curElement.token != req.token;
  });
  res.clearCookie("jwt");
  req.user.save();
  return res.status(200).json();
});

// creating user no login required
router.post(
  "/signup",
  body("name", "name must be atleast three character").isLength({
    min: 3,
  }),
  body("email", "Enetr a valid email").isEmail(),
  body("phone", "Enter a valid mobile number").isLength({ min: 10, max: 10 }),
  body("profession", "Enter your profession").isLength({ min: 2 }),
  body("password", "password must be atleast eight character").isLength({
    min: 8,
  }),
  body(
    "cpassword",
    "confirm password must be atleast eight character"
  ).isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array();
      return res.status(400).json({ error: message[0].msg });
    }
    try {
      const email = req.body.email;
      const result = await User.findOne({ email });
      if (result) {
        return res.status(422).json({ error: "this email is already exist" });
      }
      if (req.body.password != req.body.cpassword) {
        return res.status(400).json({ error: "passwords not matched" });
      }

      const mainPass = await bcrypt.hash(req.body.password, 10);
      const user = await new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        profession: req.body.profession,
        password: mainPass,
      });

      const token = await user.generateAuthToken();
      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 9999999),
        httpOnly: true,
      });
      await user.save();
      return res.status(201).json({ message: "registartion successful" });
    } catch (error) {
      return res.status(400).json({ error: "server error" });
    }
  }
);

// log in user no login required
router.post(
  "/login",
  body("email", "Enetr a valid email").isEmail(),
  body("password", "password must be atleast eight character").isLength({
    min: 8,
  }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array();
      return res.status(400).json({ error: message[0].msg });
    }
    try {
      const email = req.body.email;
      const pass = req.body.password;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "invalid credential" });
      }
      const mainPass = await bcrypt.compare(pass, user.password);
      if (!mainPass) {
        return res.status(400).json({ error: "invalid credential" });
      }
      const token = await user.generateAuthToken();
      res.cookie("jwt", token, {
        httpOnly: true,
      });
      return res.status(200).json({ token, message: "succesful login" });
    } catch (error) {
      return res.status(400).json({ error: "internal server error" });
    }
  }
);

// edit user profile
router.patch(
  "/edituser",
  body("name", "name must be atleast three character").isLength({
    min: 3,
  }),
  body("email", "Enetr a valid email").isEmail(),
  body("phone", "Enter a valid mobile number").isLength({ min: 10, max: 10 }),
  body("profession", "Enter your profession").isLength({ min: 2 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const message = errors.array();
      return res.status(400).json({ error: message[0].msg });
    }
    try {
      const { _id, name, email, phone, profession } = req.body;
      await User.findByIdAndUpdate(
        _id,
        { name, email, phone, profession },
        { new: true }
      );
      res.status(200).json("update successfull");
    } catch (error) {
      return res.status(400).json({ error: "internal server error" });
    }
  }
);

module.exports = router;
