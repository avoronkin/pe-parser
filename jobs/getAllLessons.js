var config = require('../config');
var Bot = require('../bot/PeBot.js');
var mongoose = require('mongoose-q')();
var Q = require('q');
var moment = require('moment-range');

mongoose.connect(config.mongodb.url);

var Lesson = require('../models/lesson');



module.exports = function(options, callback) {
  if (!options || !options.studentId) {
    callback(new Error('Error: getAllWeekLessons - studentId required.'));
  }
  callback = callback ? callback : function() {};

  var bot = new Bot();

  var start = moment('01.09.2014', 'DD.MM.YYYY');
  var end = moment();
  var range = moment().range(start, end);

  var promises = [];

  range.by('weeks', function(moment) {
    console.log(moment.format('DD.MM.YYYY'));

    var promise = bot.getTimetable({
      studentId: options.studentId,
      date: moment.format('DD.MM.YYYY')
    });

    promises.push(promise);
  });

  Q.allSettled(promises).then(function(results) {
      var promises = [];

      results.forEach(function(result) {
        var lessons = result.value;

        // Lesson.collection.insert(lessons, function(){
        //   console.log('lessons insert', arguments);
        // });

        lessons.forEach(function(lesson) {
          var _lesson = new Lesson(lesson);
          promises.push(_lesson.save());
        });

      });

      return Q.allSettled(promises);

    }).then(callback.bind(null, null))
    .fail(callback)
    .fin(bot.stop);

};