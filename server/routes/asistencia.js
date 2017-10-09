var express = require('express');
var router = express.Router();
var models = require('../models');
var cors = require('cors');

/* GET users listing. 
router.get('/', function(req, res, next) {
  models.Empleado.findAll().then(function(empleados) {
    res.render('asistencia/index',{
      title: 'Asistencia',
      empleados: empleados
    });
  });
});*/

router.get('/', cors(), function(req, res, next) {
  models.Asistencia.findAll({include: [{
  as: 'entradaEvt',
  model: models.Evento
},
{
  as: 'salidaEvt',
  model: models.Evento
}],where:req.query}).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});

router.options('/', cors())
router.post('/', cors(), function(req, res, next) {
  models.Asistencia.create(req.body).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});
router.options('/:id', cors())
router.patch('/:id', cors(), function(req, res, next) {
  models.Asistencia.update(req.body, { where: { id: req.params.id } } ).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});

module.exports = router;
