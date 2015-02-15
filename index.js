// var getStudentsJob = require('./jobs/getStudents');

// getStudentsJob(function(error) {
//   if (error) {
//     console.log('job get students - error:', error);
//   } else {
//     console.log('job get students - done');
//   }
// });


// var getAllLessons = require('./jobs/getAllLessons');

// getAllLessons({
//   studentId: 1360000094097//1360000036242
// }, function(error){
//   if(error){
//     console.log('getAllLessons error', error);
//   }else{

//     console.log('getAllLessons job done.');
//   }
// });

var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var restify = require('express-restify-mongoose');
var config = require('./config');
var mongoose = require('mongoose');
var Student = require('./models/student');
var Lesson = require('./models/lesson');

mongoose.connect(config.mongodb.url);

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