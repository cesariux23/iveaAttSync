var express = require('express');
var router = express.Router();
var models = require('../models');
var cors = require('cors');

router.get('/', cors(), function(req, res, next) {
  models.Empleado.findAll().then(function(empleados) {
    return res.json(200, {data: empleados});
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
