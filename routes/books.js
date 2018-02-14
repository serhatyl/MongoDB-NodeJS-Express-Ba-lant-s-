var express = require('express');
var router = express.Router();
//Models
const Book = require('../models/Book');

router.post('/new', function (req, res, next) {
    const book = new Book({
        title: 'Da Vinci',
        isPublished: false,
        comments: [
            { message: 'Harika bir kitap' }, { message: 'Ben pek beğenmedim' }
        ],
        meta: {
            votes: 4,
            favs: 10
        }
    });

    book.save((err, data) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ data });
        }
    });

});
module.exports = router;