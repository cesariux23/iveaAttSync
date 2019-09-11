var models = require('../models');
const LIMIT = 10000 // numero maximo de eventos a procesar

const processAtt = function (eventos) {
    console.log('Procesando los siguientes eventos recibidos: ' + eventos.length);
    return models.Evento.bulkCreate(eventos,{ignoreDuplicates: true})   
    
}

module.exports = (czs) =>{
    var coordinaciones = {}
    var clientes = new Map();
    var coords = [];
    const today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth()+1;
    // calcula el limite de eventos marcados como pendientes a procesar
    // será solo a partir del mes anterior
    if (month == 1 ) {
        month = 12;
        year--;
    } else {
        month--;
    }

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

            //todo: establecer variable para poder manejar esta limitante mediante la solicitud
            var last = eventos.length > LIMIT ? eventos.slice(eventos.length - LIMIT, eventos.length) : eventos
            // se filtran los eventos para procesar solo los eventos dentro del periodo establecido
            if (last.length == LIMIT) {
                last = last.filter( e => e.anio == year && e.mes >= month);
            }
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
                            anio: {
                                $gte: year
                            },
                            mes: {
                                $gte: month
                            },
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
                                    if (entrada !== null) {
                                        const updatedAtt = {}// id: att.id }
                                        updatedAtt['entrada'] = entrada.id

                                        // se determina la salida
                                        if(entrada !== salida){
                                            // siempre y cuando los eventos tengan una diferencia significativa
                                            // (minimo 5 minutos)
                                            const diferencia = calculaDiferencia(entrada, salida)
                                            if (diferencia.totalMinutos >= 5) {
                                                updatedAtt['salida'] = salida.id   
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
                                    }
                                })
                            })
                        })
                    })
                    .finally(function() {
                        console.log(zona);
                        client.broadcast.emit('logSync', {zona: zona, mensaje: 'Sincronización finalizada.', online: true})
                    })
                })
            })

            function calculaDiferencia(fecha1, fecha2) {
                const diferencia = {}
                diferencia.horas = fecha2.hora - fecha1.hora
                diferencia.minutos = fecha2.minuto - fecha1.minuto
                diferencia.totalMinutos = (diferencia.horas * 60) + diferencia.minutos
                diferencia.totalHoras = diferencia.totalMinutos / 60
                return diferencia
            }

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