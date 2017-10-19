'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empleado = sequelize.define('Empleado', {
    userid:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    rfc: DataTypes.STRING,
    nombre: DataTypes.STRING,
    adscripcion: DataTypes.STRING,
    entrada: DataTypes.TIME,
    salida: DataTypes.TIME,
    entrada_comer: DataTypes.TIME,
    salida_comer: DataTypes.TIME,
  });

  /*
  Empleado.associate = function (models) {
    Empleado.hasMany(models.Asistencia, { foreignKey: 'userid' });
  };*/
  
  return Empleado;
};