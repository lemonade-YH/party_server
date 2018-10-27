var express = require('express');
var router = express.Router();

const user = require('../control/user');
const news = require('../control/news');
const category = require('../control/category');
const swiper = require('../control/swiper');
const topic = require('../control/topic');
const common = require('../control/common')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(user);
router.use(news);
router.use(category);
router.use(swiper);
router.use(topic);
router.use(common)
module.exports = router;
