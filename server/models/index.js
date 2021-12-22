'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + './../config/config.json')[env];
var db        = {};
const cls     = require('continuation-local-storage'),
namespace     = cls.createNamespace('ivea-att-sync');

// namespace para transactions
Sequelize.useCLS(namespace);

if (config.use_env_variable) {
  var sequelize = new Sequelize(
    process.env[config.use_env_variable],
    {pool: {
      max: 100,
      min: 0,
      // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
      acquire: 100*1000,
    }}
  );
} else {
  console.log('iniciando conexión')
  var sequelize = new Sequelize(config);
}


fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(function(file) {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
