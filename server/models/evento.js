'use strict';
module.exports = function(sequelize, DataTypes) {
  var Evento = sequelize.define('Evento', {
    userid: DataTypes.INTEGER,
    verifyMode: DataTypes.INTEGER,
    fecha: DataTypes.DATE,
    anio: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    dia: DataTypes.INTEGER,
    hora: DataTypes.INTEGER,
    minuto: DataTypes.INTEGER,
    zona: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'userid', 'anio', 'mes', 'dia','fecha','hora','minuto' ]
      }
    ]
  });

  return Evento;
};