var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Evento.findAll({ include: [ models.Empleado ] }).then(function(eventos) {
    console.log(eventos);
    res.render('asistencia/index',{
      title: 'Asistencia',
      eventos: eventos
    });
  });
});

module.exports = router;
