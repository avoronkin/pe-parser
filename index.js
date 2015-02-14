var Bot = require('./bot/PeBot.js');
var Q = require('q');

var bot = new Bot();

bot
.getTimetable({
  studentId: 1360000094097
})
.then(function(data){
  console.log('then 2', data);
})
.fail(function(error){
  console.log('error', error);
  bot.stop();
})
.fin(bot.stop);


