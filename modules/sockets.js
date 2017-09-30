var models = require('../models');
const LIMIT = 5000

const processAtt = function (eventos) {
    
        console.log('Procesando los siguientes eventos recibidos: ' + eventos.length);
        /*
        return models.sequelize.Promise.map(eventos, function (evento) {
            return models.Evento.findOrCreate({
                where: {
                    userid: evento.userid,
                    verifyMode: evento.verifyMode,
                    anio: evento.anio,
                    mes: evento.mes,
                    dia: evento.dia,
                    hora: evento.hora,
                    minuto: evento.minuto,
                    fecha: evento.date,
                    zona: evento.zona
                }
            })
            .spread((evt, created) => {
                if (created) {
                    // se genera el registro de la asistencia y se marca para posterior evaluación
                    models.Asistencia.findOrCreate({
                        where: {
                            userid: evt.dataValues.userid,
                            anio: evt.dataValues.anio,
                            mes: evt.dataValues.mes,
                            dia: evt.dataValues.dia
                        }
                    }).then( (asistencia) => {
                        return models.Asistencia.update({ status: 'PENDIENTE_ASOCIACION' }, { where:{ id: asistencia[0].dataValues.id } })
                    })
                }
            })
            .catch((error) => {
                console.error('Error : ' + error)
            })
        })*/
        return models.Evento.bulkCreate(eventos,{ignoreDuplicates: true})   
    
}

module.exports = (czs) =>{
    var coordinaciones = {}
    var clientes = new Map();
    var coords = [];
    var test = 'test';

    czs.on('connection', function(client) {

        console.log('Client connected...');

        client.on('join', function(data) {
            coordinaciones[data.zona] = client.id;
            clientes.set(client.id, data.zona);
            coords.push(data);
            console.log(coordinaciones);
            client.emit('messages', 'Conectado');
        });

        client.on('reqZonas', function(data) {
            client.emit('online', {coordinaciones});
        });

        client.on('reqSync', function(data) {
            client.broadcast.to([data]).emit('getLastEvents', new Date());
        });

        client.on('sendAttEvents', function(data) {
            const eventos = data.eventos.sort(function(a,b){
                const fa = new Date(a.fecha)
                const fb = new Date(b.fecha)
                return fa.getTime() - fb.getTime()
            })
            const last = eventos.length > LIMIT ? eventos.slice(eventos.length - LIMIT, eventos.length) : eventos

            console.log(last)
            return models.sequelize.transaction(function (t) {
            processAtt(last).then((result)=>{
                const asistencia = last.map((e) => {
                    return {
                        userid: e.userid,
                        anio: e.anio,
                        mes: e.mes,
                        dia: e.dia,
                        status:'PENDIENTE'
                    }
                })
                models.Asistencia.bulkCreate(asistencia,{ignoreDuplicates: true})
                .then(()=> {
                    //sobre las asistencias pendientes se trabaja para asociar eventos con asistencias
                    models.Asistencia.findAll({
                        where: {
                            status:'PENDIENTE'
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
                                    order: ['fecha']
                                    }
                                )

                                .then(eventos => {
                                    let entrada = eventos[0]
                                    let salida = eventos.pop()
                                    
                                    const updatedAtt = {}// id: att.id }
                                    updatedAtt['entrada'] = entrada.id
                                    if(entrada !== salida){
                                        updatedAtt['salida'] = salida.id
                                    }
                                    //return updatedAtt
                                    models.Asistencia.update(updatedAtt, { where: {id: att.id} })
                                })
                            })
                        })
                    })
                })
            })

            /*
            if(processAtt(data.eventos)){
            
                return models.sequelize.transaction(function (t) {
                //Se porcesan todos los registros de asistencia pendientes
                return models.Asistencia.findAll({
                    where: {
                        status:'PENDIENTE_ASOCIACION'
                    },
                }).then( (asistencia) => {
                    // de los eventos correspondientes, se marca el minimo como entrada
                    // y el maximo como salida
                    return models.sequelize.Promise.map(asistencia, function (att) {
                        return models.Evento.findAll({ 
                            where: {
                                userid: att.userid,
                                anio: att.anio,
                                mes: att.mes,
                                dia: att.dia
                            },
                            order: ['fecha'],
                            transaction: t
                            }
                        )
                        .then(eventos => {
                            let entrada = eventos[0]
                            let salida = eventos.pop()
                            
                            const updatedAtt = {}
                            updatedAtt['entrada'] = entrada.id
                            if(entrada !== salida){
                                updatedAtt['salida'] = salida.id
                            }
                            //se asocia los eventos de entrada y salida de la asistencia
                            return models.Asistencia.update(updatedAtt, { where: {id: att.id} })
                        })
                        
                    })
                })

            })}
            */
        })
        });

        client.on('disconnect', function() {
            cz = clientes.get(client.id);
            if(coordinaciones.hasOwnProperty(cz)){
                delete coordinaciones[cz];
            }
            console.log('cliente desconectado: '+cz);
            console.log(coordinaciones);
            coords=coords.splice(coords.lastIndexOf(cz),1);
            client.broadcast.emit('online',{coordinaciones});
        });
    });
}