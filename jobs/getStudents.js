var config = require('../config');
var Bot = require('../bot/PeBot.js');
var mongoose = require('mongoose-q')();
var Q = require('q');

mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/pe');

var Student = require('../models/student');
var bot = new Bot();


module.exports = function(callback) {
  callback = callback ? callback : function() {};

  bot
    .getStudents()
    .then(function(students) {
      var promises = [];

      students.forEach(function(data) {
        var student = new Student(data);
        promises.push(student.save());
      });

      return Q.all(promises);
    })
    .then(callback.bind(null, null))
    .fail(callback)
    .fin(bot.stop);

};