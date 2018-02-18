const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  //unique
  //required
  //default
  //type

  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  comments: [{ message: String }],
  meta: {
    votes: Number,
    favs: Number
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  publishTime: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("book", BookSchema);
