require("dotenv").config();
require("./db/db");
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(express.json());
app.use(require("./routes/userroutes"));




app.listen(port, () => {
  console.log(`app listening at port  ${port}`);
});
