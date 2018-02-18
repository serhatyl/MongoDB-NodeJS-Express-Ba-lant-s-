var express = require("express");
var router = express.Router();
//Models
const Book = require("../models/Book");

router.post("/new", function(req, res, next) {
  const book = new Book({
    title: "Da Vinci",
    isPublished: false,
    category: "Story",
    comments: [
      { message: "Harika bir kitap" },
      { message: "Ben pek beğenmedim" }
    ],
    meta: {
      votes: 4,
      favs: 10
    }
  });

  book.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ data });
    }
  });
});

//search route
//find
router.get("/search", (req, res) => {
  Book.find(
    { isPublished: false, title: "Da Vinci" },
    "title , comments",
    (err, data) => {
      res.json(data);
    }
  );
});

//findOne
router.get("/searchOne", (req, res) => {
  Book.findOne({ title: "Da Vinci" }, (err, data) => {
    res.json(data);
  });
});

//findById
router.get("/searchById", (req, res) => {
  Book.findById("5a84401f3cc9353b24a12f62", (err, data) => {
    res.json(data);
  });
});

//güncelleme işlemi birden fazla alan varsa ilk bulduğu kayıdı günceller
// birden fazla alanı güncellemek isterseniz multi:true eklemek gerekiyor
router.put("/update", (req, res) => {
  Book.update(
    { isPublished: false },
    { isPublished: true },
    // { multi: true },
    { upsert: true }, //upsert update sırasında false olan kayıt bulamazsa gidip yeni bir kayıt ekliyor
    (err, data) => {
      res.json(data);
    }
  );
});

router.put("/updateById", (req, res) => {
  Book.findByIdAndUpdate(
    "5a86ea7eeab3cf208c3ce0ed",
    {
      "meta.favs": 13
    },
    (err, data) => {
      res.json(data);
    }
  );
});

//silme işlemi

//findById
router.delete("/remove", (req, res) => {
  Book.findById("5a84401f3cc9353b24a12f62", (err, book) => {
    book.remove((err, data) => {
      res.json(data);
    });
  });
});

//findOneAndRemove - ispublished true olanlardan ilk bulduğunu sildi
router.delete("/removefindoneandremove", (req, res) => {
  Book.findOneAndRemove({ isPublished: true }, (err, data) => {
    res.json(data);
  });
});

//title'ı başlangıç olan tüm kayıtları siler
router.delete("/routerremove", (req, res) => {
  Book.remove({ title: "Başlangıç" }, (err, data) => {
    res.json(data);
  });
});

//sort - sıralama işlemi
router.get("/sort", (req, res) => {
  Book.find({}, (err, data) => {
    res.json(data);
  }).sort({ "meta.favs": -1, title: 1 }); //1 yaparsak seçili alanı küçükten büyüğe sıralar -1 yaparsak büyükten küçüğe sıralar
});

module.exports = router;

//limit and skip
router.get("/limitandskip", (req, res) => {
  Book.find({}, (err, data) => {
    res.json(data);
  })
    .skip(1) //1.kayıdı atla 2 tane göster anlamına geliyor
    .limit(2);
});

//aggregate
//match - eşleştirme
//group
//project sadece istenilen alanları getirir
//sort
router.get("/aggregate", (req, res) => {
  Book.aggregate(
    [
      {
        $match: { isPublished: false }
      },
      // {
      //   $group: {
      //     _id: "$category",
      //     adet: { $sum: 1 }
      //   }
      // },
      {
        $project: {
          //sadece istenilen alanlar gelir
          title: 1,
          meta: 1
        }
      },
      {
        $sort: {
          //sıralama işlemi
          title: 1
        }
      },
      {
        $limit: 2
      },
      {
        $skip: 1
      }
    ],
    (err, result) => {
      res.json(result);
    }
  );
});
