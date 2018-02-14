var express = require('express');
var router = express.Router();
//Models
const Book = require('../models/Book');

router.post('/new', function (req, res, next) {
    const book = new Book({
        title: 'PHP',
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

//search route
router.get('/search', (req, res) => {
    Book.find({ isPublished: false, title: 'Da Vinci' }, 'title , comments', (err, data) => {
        res.json(data);
    });
});


router.get('/searchOne', (req, res) => {
    Book.findOne({ title: 'Da Vinci' }, (err, data) => {
        res.json(data);
    });
});


module.exports = router;