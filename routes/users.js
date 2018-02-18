var express = require("express");
var router = express.Router();

const User = require("../models/User");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

router.post("/new", (req, res) => {
  const user = new User({
    fullName: "Buğra Boybeyi",
    age: 22
  });
  user.save((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json(data);
    }
  });
});

router.get("/getAll", (req, res) => {
  User.find({}, (err, data) => {
    res.json(data);
  });
});

module.exports = router;
