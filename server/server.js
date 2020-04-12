require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("express-jwt");
const mongoose = require("mongoose");
const bcrypt = require("bdcrypt");

const User = require("./mongodb-scheme");

const app = express();

app.use(bodyParser());

app.post("/user/signup", (req, res) => {
  bcrypt.hash(req.body.password, 10).then(function (hash) {
    const user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hash,
      phone: req.body.phone,
    });
    user.save((err) => {
      if (err) return res.send(err);
    });
  });
});

app.listen(3001);
