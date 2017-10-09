'use strict';
module.exports = function(sequelize, DataTypes) {
  var Asistencia = sequelize.define('Asistencia', {
    userid: {
      type: DataTypes.INTEGER,
      /*
      references: {
        model: 'empleados',
        key: 'userid'
      }*/
    },
    anio: DataTypes.INTEGER,
    mes: DataTypes.INTEGER,
    dia: DataTypes.INTEGER,
    entrada: {
      type: DataTypes.INTEGER,
      references: {
        model: 'eventos'
      }
    },
    salida: {
      type: DataTypes.INTEGER,
      references: {
        model: 'eventos'
      }
    },
    status: DataTypes.STRING,
    observaciones: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: [ 'userid', 'anio', 'mes', 'dia' ]
      }
    ]
  }
);

  Asistencia.associate = function (models) {
    Asistencia.belongsTo(models.Evento, {
      as: 'entradaEvt',
      foreignKey: 'entrada'
    });
    Asistencia.belongsTo(models.Evento, {
      as: 'salidaEvt',
      foreignKey: 'salida'
    });
  };

  return Asistencia;
};