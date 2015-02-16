var config = require('./config');
var mongoose = require('mongoose-q')();
mongoose.connect(config.mongodb.peUrl);
var Students = require('./models/student');


var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = new schedule.Range(12 - 3, 16 - 3, 1); //-3 timezone...
rule.minute = new schedule.Range(0, 59, 5);


var getWeekLessons = require('./jobs/getWeekLessons');



schedule.scheduleJob(rule, function() {
  console.log('start job', (new Date()));

  Students.find({}, function(err, students) {
    students.forEach(function(student) {

      getWeekLessons({
        studentId: student.id
      }, function(error) {
        if (error) {
          console.log('getWeekLessons error', (new Date()), error);
        } else {
          console.log('getWeekLessons job done.', (new Date()));
        }
      });

    });
  });

});