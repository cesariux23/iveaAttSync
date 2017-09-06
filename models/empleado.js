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
  });

  Empleado.associate = function (models) {
    Empleado.hasMany(models.Evento, { foreignKey: 'userid' });
  };
  
  return Empleado;
};