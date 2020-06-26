var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('home', { title: "sarah && roma" });
});

// if (!req.session.cart) {
//   return res.render('shop/shopping-cart', {products: null});
// }

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.session.oldUrl = req.url;
  res.redirect('/user/signin');
}
