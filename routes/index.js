var main = require('../src/Main');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/" , function(request, response){  
  let result = main.input(request.body.dropDown);
  response.render('index', { result: result});
})

module.exports = router;
