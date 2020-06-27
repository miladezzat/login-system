var express = require('express');
var router = express.Router();

const placeModel = require("../models/place");

/* GET home page. */
router.get('/', async (req, res, next) => {
  const popular_destination = await placeModel.find().limit(3);

  res.render('home', { title: "sarah && roma", popular_destination });
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
