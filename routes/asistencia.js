var express = require('express');
var router = express.Router();
var models = require('../models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  models.Empleado.findAll().then(function(empleados) {
    res.render('asistencia/index',{
      title: 'Asistencia',
      empleados: empleados
    });
  });
});

module.exports = router;
