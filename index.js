var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('express-restify-mongoose');
var config = require('./config');

var mongoose = require('mongoose-q')();
mongoose.connect(config.mongodb.peUrl);
var Student = require('./models/student');
var Lesson = require('./models/lesson');


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());

var router = express.Router();

restify.serve(router, Student); // /api/v1/students
restify.serve(router, Lesson); // /api/v1/lessons api/v1/lessons?studentId=1360000094097&date=>2015-02-10
app.use(router);

app.listen(3000, function() {
    console.log("Express server listening on port 3000");
});

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1, 5)];
rule.hour = new schedule.Range(12 - 3, 16 - 3, 1); //-3 timezone...
rule.minute = new schedule.Range(0, 59, 2);


var getWeekLessons = require('./jobs/getWeekLessons');

schedule.scheduleJob(rule, function() {
  console.log('start job', (new Date()));

  Student.find({}, function(err, students) {
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