const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: String,
    isPublished: Boolean,
    comments: [{ message: String }],
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('book', BookSchema);
