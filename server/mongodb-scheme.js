require("dotenv").config();
const mongoose = require("mongoose");

const db = mongoose.createConnection(process.env.MONGO_URI);

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  id: ObjectId,
  email: String,
  name: String,
  password: String,
  phone: String,
  mood: {
    name: String,
    date: Date,
  },
});

const User = db.model("User", UserSchema);

module.exports = User;
