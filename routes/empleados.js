var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res, next) {
  models.Empleado.findAll().then(function(empleados) {
    res.render('empleados/index',{
      title: 'Empleados',
      empleados: empleados
    });
  });
});

router.get('/registro', function(req, res, next) {
  res.render('empleados/new',{
    title: 'Registro',
  });
});

router.post('/registro', function(req, res) {
  models.Empleado.create({
    rfc: req.body.rfc,
    nombre: req.body.nombre,
    adscripcion: req.body.adscripcion,
    description: req.body.description,
    userid: req.body.userid
  }).then(function() {
    res.redirect('/empleados');
  });
});

module.exports = router;
