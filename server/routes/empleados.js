var express = require('express');
var router = express.Router();
var models = require('../models');
var cors = require('cors');

router.get('/', cors(), function(req, res, next) {
  models.Empleado.findAll().then(function(empleados) {
    return res.json(200, {data: empleados});
  });
});

router.get('/:id', cors(), function(req, res, next) {
  models.Empleado.findById(req.params.id).then(function(empleado) {
    return res.json(200, {data: empleado});
  });
});
router.options('/', cors())
router.post('/', cors(), function(req, res) {
  models.Empleado.create(req.body).then(function(empleado) {
    return res.json(200, {data: empleado});
  });
});

router.options('/:id', cors())
router.patch('/:id', cors(), function(req, res, next) {
  models.Empleado.update(req.body, { where: { userid: req.params.id } } ).then(function(empleado) {
    return res.json(200, {data: empleado});
  });
});

module.exports = router;
