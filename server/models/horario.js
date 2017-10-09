'use strict';
module.exports = function(sequelize, DataTypes) {
  var Horario = sequelize.define('Horario', {
    user: DataTypes.INTEGER,
    hora_entrada: DataTypes.TIME,
    hora_salida: DataTypes.TIME
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        //Horario.hasOne(models.Empleado)
      }
    }
  });
  return Horario;
};