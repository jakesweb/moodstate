require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = require("./mongodb-scheme");

const app = express();

app.use(bodyParser());
app.use(cookieParser());

function createAuthToken(id) {
  var sign = process.env.JWT_SECRET;
  var payload = { user: id, access: "authenticated" };
  return jwt.sign(payload, sign, { expiresIn: 86400 });
}

function authenticateRoute(req, res, next) {
  var token = req.cookies["id"];

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err || !decoded) {
      console.log("invalid token");
      res.send(403);
    } else if (
      decoded &&
      (!decoded.access || decoded.access == "unauthenticated")
    ) {
      console.log("unauthenticated token");
      res.send(403);
    } else if (decoded && decoded.access == "authenticated") {
      console.log("valid token");
      next();
    } else {
      console.log("something suspicious");
      res.send(403);
    }
  });
}

app.post("/user/signup", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (user) {
      return res.send("User Already Created");
    } else {
      bcrypt.hash(req.body.password, 10).then(function (hash) {
        const user = new User({
          email: req.body.email,
          name: req.body.name,
          password: hash,
          phone: req.body.phone,
        });
        user.save((err) => {
          if (err) return res.send(err);
          var token = createAuthToken(req.body.email);
          var newDate = new Date();
          var expDate = newDate.setMonth(newDate.getMonth() + 3);
          res.cookie("id", token, { sameSite: "lax", maxAge: expDate });
          res.redirect("http://localhost:3000/");
        });
      });
    }
  });
});

app.post("/user/signin", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.send(err);
    if (bcrypt.compare(req.body.password, user.password)) {
      var token = createAuthToken(req.body.email);
      var newDate = new Date();
      var expDate = newDate.setMonth(newDate.getMonth() + 3);
      res.cookie("id", token, { sameSite: "lax", maxAge: expDate });
      res.redirect("http://localhost:3000/");
    } else {
      return res.send("Bad Username or Password");
    }
  });
});

app.get("/secret", authenticateRoute, (req, res) => {
  res.send("You found it");
});

app.listen(3001);
