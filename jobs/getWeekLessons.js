var config = require('../config');
var Bot = require('../bot/PeBot.js');
var mongoose = require('mongoose-q')();
var Q = require('q');
var moment = require('moment-range');

mongoose.connect(config.mongodb.url);

var Lesson = require('../models/lesson');



module.exports = function(options, callback) {
  if (!options || !options.studentId) {
    callback(new Error('Error: getCurrentWeekLessons - studentId required.'));
  }
  callback = callback ? callback : function() {};

  var bot = new Bot();
  
  bot
    .getTimetable({
      studentId: options.studentId
    })
    .then(function(lessons) {

      var promises = [];

      lessons.forEach(function(lesson){
        var _lesson = new Lesson(lesson);
        promises.push(_lesson.save());
      });

      return Q.allSettled(promises);
    })
    .then(callback.bind(null, null))
    .fail(callback)
    .fin(bot.stop);

};