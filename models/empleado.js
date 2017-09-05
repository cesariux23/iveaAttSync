'use strict';
module.exports = function(sequelize, DataTypes) {
  var Empleado = sequelize.define('Empleado', {
    userid: DataTypes.INTEGER,
    rfc: DataTypes.STRING,
    nombre: DataTypes.STRING,
    adscripcion: DataTypes.STRING,
  }, {
    indexes: [
      {
        name: 'userid_index',
        fields: ['userid']
      }
    ]
  });

  Empleado.associate = function (models) {
    Empleado.hasMany(models.Evento, { foreignKey: 'userid', sourceKey: 'userid'});
  };
  
  return Empleado;
};