const express = require("express");

const cors = require("cors");
const passport = require("passport");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const app = express();
require("./config/database");
require("./models/usersModel");
require("./models/postsModel");
require("./config/passport")(passport);

app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(require("./routes"));
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`This server is on port ${port}`);
});

app.use("*", (req, res) => res.status(404).json({ error: "Not Found" }));

module.exports = app;
