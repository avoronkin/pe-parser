var config = require('../config');
var Bot = require('../bot/PeBot.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://' + config.mongodb.host + ':' + config.mongodb.port + '/pe');

var Lesson = require('../models/lesson');
var bot = new Bot();

// bot
// .getTimetable()
// .then(function(students){

//   students.forEach(function(_student){
//     var student = new Student(_student);
//     student.save();
//     // console.log('student', student);
//   });

// })
// .fail(function(error){
//   console.log('error', error);
//   bot.stop();
// })
// .fin(bot.stop);