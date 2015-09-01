var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var _         = require('lodash');
var config    = require('./config');
var winston   = require('./winston');
var db        = {};


winston.info('Initializing Sequelize...');

// create your instance of sequelize
var sequelize = new Sequelize(config.db.name, config.db.username, config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: 'mysql',
  storage: config.db.storage,
  logging: config.enableSequelizeLog ? winston.verbose : false
});

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(config.modelsDir)
  .filter(function(file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  // import model files and save model names
  .forEach(function(file) {
    winston.info('Loading model file ' + file);
    var model = sequelize.import(path.join(config.modelsDir, file));
    db[model.name] = model;
  });

// invoke associations on each of the models
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
});

// Synchronizing any model changes with database. 
// WARNING: this will DROP your database everytime you re-run your application
var now = new Date();
var jsonDate = now.toJSON().replace("T"," ").split(".")[0];
var insertOrUpdateStatement = 'INSERT INTO Polls (id, title, question_one, question_two, question_three, question_four, createdAt, updatedAt)';
insertOrUpdateStatement += 'VALUES (1, "What is the best company in the U.S.?", "Best Buy", "Teikametrics", "SumoMe", "Gazelle", "' + jsonDate + '", "' + jsonDate + '"),';
insertOrUpdateStatement += '(2, "How old is the presendent of the U.S.?", "52","45","49","54", "' + jsonDate + '", "' + jsonDate + '"),';
insertOrUpdateStatement += '(3, "What is the best soda?", "Pepsi", "Coke", "Mellow Yellow", "Dr. Pepper", "' + jsonDate + '", "' + jsonDate + '"),';
insertOrUpdateStatement += '(4, "Who will win the super bowl this year?", "Cowboys", "Saints", "Eagles", "Patriots", "' + jsonDate + '", "' + jsonDate + '"),';
insertOrUpdateStatement += '(5, "What is your favorite season?", "Spring", "Summer", "Fall", "Winter", "' + jsonDate + '", "' + jsonDate + '") ON DUPLICATE KEY UPDATE id=VALUES(id), title=VALUES(title), ';
insertOrUpdateStatement += 'question_one=VALUES(question_one), question_two=VALUES(question_two), question_three=VALUES(question_three), question_four=VALUES(question_four)';

sequelize
  .sync({force: config.forceSequelizeSync})
  .then(function(){
      sequelize.query(insertOrUpdateStatement)
      winston.info("Database "+(config.forceSequelizeSync?"*DROPPED* and ":"")+ "synchronized");
    }).catch(function(err){
      winston.error("An error occured: %j",err);
    });

// assign the sequelize variables to the db object and returning the db. 
module.exports = _.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);