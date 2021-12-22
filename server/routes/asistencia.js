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
  models.Asistencia.bulkCreate(req.body, { ignoreDuplicates: true }).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});

router.patch('/', cors(), function(req, res, next) {
  let ids = req.body.ids
  delete req.body.ids
  models.Asistencia.update(req.body, {  where: { id: ids  } }).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});

router.options('/:id', cors())
router.patch('/:id', cors(), function(req, res, next) {
  models.Asistencia.update(req.body, { where: { id: req.params.id } } ).then(function(asistencia) {
    return res.json(200, {data: asistencia});
  });
});

var calculaDiferencia = (fecha1, fecha2) => {
  const diferencia = {}
  diferencia.horas = fecha2.hora - fecha1.hora
  diferencia.minutos = fecha2.minuto - fecha1.minuto
  diferencia.totalMinutos = (diferencia.horas * 60) + diferencia.minutos
  diferencia.totalHoras = diferencia.totalMinutos / 60
  return diferencia
}

router.options('/resync', cors())
router.post('/resync',cors(), function(req, res, next) {
  models.Asistencia.findAll({
    where: {
        status:'PENDIENTE',
        entrada: null,
    },
  }).then( (asistencia) => {
    return models.sequelize.transaction(function (t2) {
        return models.sequelize.Promise.map(asistencia, function (att) {
            return models.Evento.findAll({ 
                where: {
                    userid: att.userid,
                    anio: att.anio,
                    mes: att.mes,
                    dia: att.dia
                },
                order: ['hora','minuto']
                }
            )

            .then(eventos => {
                let entrada = eventos[0]
                let salida = eventos.pop()
                if (entrada !== null) {
                    const updatedAtt = {}// id: att.id }
                    updatedAtt['entrada'] = entrada.id

                    // se determina la salida
                    if(entrada !== salida){
                        updatedAtt['salida'] = salida.id   
                        // siempre y cuando los eventos tengan una diferencia significativa
                        // (minimo 5 minutos)
                        const diferencia = calculaDiferencia(entrada, salida)
                        if (diferencia.totalMinutos >= 5) {
                            // si el total de horas es >=6.75 y menor a 7 , es una asistencia, pero ya no tiene puntualidad
                            if (diferencia.totalHoras >= 6.75 && diferencia.totalHoras < 7) {
                                updatedAtt['status'] = 'ASISTENCIA'
                            }
                            // si es mayor a 6.5 es un retardo

                            // si es menor, es retardo mayor
                            if (diferencia.totalHoras < 6.5) {
                                updatedAtt['status'] = 'RETARDO MAYOR'
                            }
                        }
                    }
                    models.Asistencia.update(updatedAtt, { where: {id: att.id} })
                } else {
                  console.log('entrada vacia')
                }
            })
            .finally(() =>{
              return res.json(200, {data: 'ok'});
            })
        })
    })
  })
})

module.exports = router;
