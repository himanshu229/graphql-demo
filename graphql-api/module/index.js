const mongoose = require("mongoose");
// require("dotenv").config();
const Schema = mongoose.Schema;

const BookList = new Schema({
  bookName: { type: String, require: true },
  authorName: { type: String, require: true },
  subject: { type: String, require: true },
});

module.exports = mongoose.model("Book", BookList);


