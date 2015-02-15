var Bot = require('./bot/PeBot.js');
var Q = require('q');

var bot = new Bot();

bot
.getStudents()
.then(function(students){

  students.forEach(function(student){
    console.log('student', student.id);

  });
  
})
.fail(function(error){
  console.log('error', error);
  bot.stop();
})
.fin(bot.stop);


