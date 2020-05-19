var main = require('../src/Main');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/" , function(req, res){  
  let result = main.input(req.body.dropDown);
  res.render('index', { result: result});
})

module.exports = router;
