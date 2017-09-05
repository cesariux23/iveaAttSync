'use strict';
module.exports = function(sequelize, DataTypes) {
  var Evento = sequelize.define('Evento', {
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: 'empleados',
        key: 'userid'
      }
    },
    verifyMode: DataTypes.INTEGER,
    date: DataTypes.DATE,
    zona: DataTypes.STRING
  });

  Evento.associate = function (models) {
    Evento.belongsTo(models.Empleado, { foreignKey: 'userid', sourceKey: 'userid'});
  };

  return Evento;
};