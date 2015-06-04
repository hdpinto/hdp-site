var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Herlander Pinto | About Me', body: 'about.ejs', active: 'about', chat: false });
});
router.get('/portfolio', function(req, res, next) {
  res.render('index', { title: 'Herlander Pinto | My Portfolio', body: 'portfolio.ejs', active: 'portfolio', chat: false });
});
router.get('/resume', function(req, res, next) {
  res.render('index', { title: 'Herlander Pinto | My Resume', body: 'resume.ejs', active: 'resume', chat: false });
});
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Herlander Pinto | Hire Me', body: 'contact.ejs', active: 'contact', chat: true });
});
/*
router.get('/blog', function(req, res, next) {
  res.render('index', { title: 'Diogo Pinto | Hire Me', body: 'blog.ejs', active: 'blog' });
});
*/


module.exports = router;
