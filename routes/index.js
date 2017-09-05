var express = require('express');
var router = express.Router();

/* GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});*/
router.get('/dispositivos', function(req, res, next) {
  res.render('dispositivos', { title: 'Dispositivos en linea' });
});

module.exports = router;
