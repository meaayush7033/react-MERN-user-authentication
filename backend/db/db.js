const mongoose = require("mongoose");

const db = process.env.DB;
mongoose
  .connect(db)
  .then(() => console.log("connection successfull"))
  .catch((e) => console.log(e));
