const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');

const csrfProtection = csrf();
router.use(csrfProtection);

router.get('/profile', isLoggedIn, function (req, res, next) {  
  res.render('user/profile', { username: req.user.full_name , title: "sarah && roma"});
});

router.get('/addproduct', isLoggedIn, function (req, res, next) {
  res.render('user/addproduct', { csrfToken: req.csrfToken() });
});

router.post('/addproduct', isLoggedIn, function (req, res, next) {
  res.redirect('user/addproduct');
});

router.get('/logout', isLoggedIn, function (req, res, next) {
  req.logout();  
  res.redirect('/');
});

router.use('/', notLoggedIn, function (req, res, next) {
  next();
});

/* GET Sign UP page. */
router.get('/signup', function (req, res, next) {
  const messages = req.flash('error');
  res.render('user/signup', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
    title: "sarah && roma",
  });
});

router.post('/signup', passport.authenticate('local.signup', {
  failureRedirect: '/user/signup',
  failureFlash: true
}), function (req, res) {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/user/profile');
  }
});
router.get('/signin', function (req, res, next) {
  const messages = req.flash('error');
  res.render('user/signin', {
    csrfToken: req.csrfToken(),
    messages: messages,
    hasErrors: messages.length > 0,
    title: "sarah && roma",
  });
});

router.post('/signin', passport.authenticate('local.signin', {
  failureRedirect: '/user/signin',
  failureFlash: true
}), function (req, res) {
  if (req.session.oldUrl) {
    const oldUrl = req.session.oldUrl;
    req.session.oldUrl = null;
    res.redirect(oldUrl);
  } else {
    res.redirect('/');
  }
});

module.exports = router;

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  res.redirect('/');
}
