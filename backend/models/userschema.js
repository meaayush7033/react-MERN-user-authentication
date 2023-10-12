const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { Schema } = mongoose;

const user = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    require: true,
  },
  profession: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
  messages:  [
    {
      message: {
        type: String,
      },
    },
  ],
});

// generating token
user.methods.generateAuthToken = async function () {
    try {
      const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
      this.tokens = this.tokens.concat({token:token});
      await this.save();
      return token;
    } catch (error) {
      res.send(error);
    }
  };

const User = new mongoose.model("user", user);
module.exports = User;
