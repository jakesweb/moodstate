require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const MessagingResponse = require("twilio").twiml.MessagingResponse;

const User = require("./mongodb-scheme");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));

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
        var phone = req.body.phone;

        if (phone.slice(0, 1) !== "+") {
          phone = "+" + phone;
        }

        const user = new User({
          email: req.body.email,
          name: req.body.name,
          password: hash,
          phone: phone,
        });

        user.save((err) => {
          if (err) return res.send(err);

          var token = createAuthToken(req.body.email);

          res.cookie("id", token, { sameSite: "lax" });
          res.redirect("http://localhost:3000/");
        });
      });
    }
  });
});

app.post("/user/signin", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) return res.send(err);
    if (!user) return res.send("Bad Username or Password");

    if (bcrypt.compare(req.body.password, user.password)) {
      var token = createAuthToken(req.body.email);

      res.cookie("id", token, { sameSite: "lax" });
      res.redirect("http://localhost:3000/");
    } else {
      return res.send("Bad Username or Password");
    }
  });
});

app.post("/sms", (req, res) => {
  const twiml = new MessagingResponse();
  User.findOne({ phone: req.body.From }, (err, user) => {
    if (err) {
      twiml.message("There was an unexpected error. Please try again");

      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    }
    if (!user) {
      console.log(req.body);
      twiml.message(
        "No user registered for this phone number. Please signup at moodstate.co"
      );

      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    } else {
      var today = new Date();

      User.update(
        { email: user.email },
        { $push: { mood: { name: req.body.Body, date: today } } },
        (err) => {
          if (err) res.send(err);
        }
      );

      twiml.message("Successfully added mood.");
      res.writeHead(200, { "Content-Type": "text/xml" });
      res.end(twiml.toString());
    }
  });
});

app.get("/secret", authenticateRoute, (req, res) => {
  res.send("You found it");
});

app.get("/user/data", authenticateRoute, (req, res) => {
  var token = req.cookies["id"];
  var decoded = jwt.decode(token);

  if (decoded.user) {
    User.findOne({ email: decoded.user }, (err, user) => {
      if (err) return res.send(err);
      var mood = user.mood;

      res.json(mood);
    });
  } else {
    res.send("User not found");
    res.redirect("http://localhost:3000/signin");
  }
});

app.listen(3001);
