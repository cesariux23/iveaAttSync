var models = require('../models');

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
            

            models.sequelize.transaction(function (t) {
                console.log('Procesando los siguentes eventos recibidos: ' + data.eventos.length);
                return models.sequelize.Promise.map(data.eventos, function (evento) {
                  return models.Evento.findOrCreate({
                    where: {
                        userid: evento.userid,
                        verifyMode: evento.verifyMode,
                        date: evento.date,
                        zona: evento.zona
                    },
                    transaction: t
                    }).catch((error) => {
                        console.error('Error : ' + error)
                    })
                })
              })
            //data.eventos.forEach(function(event) {
                //let count = 0;
                //if (event.userid > 0) {
                    /*
                    models.Evento.bulkCreate(data.eventos).then(() => { // Notice: There are no arguments here, as of right now you'll have to...
                        return models.Evento.findAll();
                      }).then(evento => {
                        //console.log(evento) // ... in order to get the array of user objects
                      })
                    /*
                    //Se insertan los enventos en la base de datoss
                    models.sequelize.transaction(function(t){
                        return models.Evento.bulkCreate({
                        where: {
                            userid: event.userid,
                            verifyMode: event.verifyMode,
                            date: event.date,
                            zona: event.zona
                        },
                        transaction: t
                        })
                        // necessary to use spread to find out if user was found or created
                        .spread(function(userResult, created){
                        // this userId was either created or found depending upon whether the argment 'created' is true or false
                        // do something with this user now
                        if (created){
                            // some logic
                            count += 1
                        }
    
                        }); // end spread
                    }) // end transaction
                    */
                //}
                /*
                console.log(event.user);
                console.log(event.verifyMode);
                console.log(event.date);*/
            //});
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