var models = require('../models');
const LIMIT = 10000

const processAtt = function (eventos) {
    
        console.log('Procesando los siguientes eventos recibidos: ' + eventos.length);
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
            coordinaciones[data.zona] = {id: client.id, zona: data.zona, mensaje: 'En línea.', online: true};
            clientes.set(client.id, data.zona);
            coords.push(data);
            client.emit('messages', 'Conectado');
            // se publica la lista de coordinaciones actualizada
            client.broadcast.emit('online', {coordinaciones});
        });

        client.on('reqZonas', function(data) {
            client.emit('online', {coordinaciones});
        });

        client.on('reqSync', function(data) {
            client.broadcast.to([data]).emit('getLastEvents', new Date());
        });
        client.on('sendLogSync', function(data) {
            if (data.hasOwnProperty('online')) {
                data.online = false
            }
            client.broadcast.emit('logSync', data)
        });

        client.on('sendAttEvents', function(data) {
            const eventos = data.eventos.sort(function(a,b){
                const fa = new Date(a.fecha)
                const fb = new Date(b.fecha)
                return fa.getTime() - fb.getTime()
            })
            const last = eventos.length > LIMIT ? eventos.slice(eventos.length - LIMIT, eventos.length) : eventos
            const zona =  last[0].zona
            client.broadcast.emit('logSync', {zona: zona, mensaje: 'Procesando datos recibidos...'})
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
                    client.broadcast.emit('logSync', {zona: zona, mensaje: 'Generando asociación automática...'})
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
                    .finally(function() {
                        client.broadcast.emit('logSync', {zona: zona, mensaje: 'Sincronización finalizada.', online: true})
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
                coords=coords.splice(coords.lastIndexOf(cz),1);
                client.broadcast.emit('online',{coordinaciones});
            }
            console.log('cliente desconectado: '+cz);
        });
    });
}