var express = require('express');
var router = express.Router();
var models = require('../models');
var cors = require('cors');

router.get('/', cors(), function(req, res, next) {
  models.Evento.findAll({where:req.query}).then(function(eventos) {
    return res.status(200).json({data: eventos});
  });
});

router.options('/', cors())
router.post('/', cors(), function(req, res, next) {
  models.Evento.create(req.body).then(function(evento) {
    return res.status(200).json({data: evento});
  });
});
router.options('/:id', cors())
router.patch('/:id', cors(), function(req, res, next) {
  models.Evento.update(req.body, { where: { id: req.params.id } } ).then(function(evento) {
    return res.status(200).json({data: evento});
  });
});

module.exports = router;
