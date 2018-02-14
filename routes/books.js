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
//find
router.get('/search', (req, res) => {
    Book.find({ isPublished: false, title: 'Da Vinci' }, 'title , comments', (err, data) => {
        res.json(data);
    });
});


//findOne
router.get('/searchOne', (req, res) => {
    Book.findOne({ title: 'Da Vinci' }, (err, data) => {
        res.json(data);
    });
});


//findById
router.get('/searchById', (req, res) => {
    Book.findById('5a84401f3cc9353b24a12f62', (err, data) => {
        res.json(data);
    });
});


//güncelleme işlemi birden fazla alan varsa ilk bulduğu kayıdı günceller
// birden fazla alanı güncellemek isterseniz multi:true eklemek gerekiyor
router.put('/update', (req, res) => {
    Book.update({ isPublished: false }, { isPublished: true }, { multi: true }, (err, data) => {
        res.json(data);
    });
});


module.exports = router;