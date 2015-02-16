var config = require('../config');
var Bot = require('../bot/PeBot.js');
var Q = require('q');
var Student = require('../models/student');



module.exports = function(callback) {
  callback = callback ? callback : function() {};

  var bot = new Bot();

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