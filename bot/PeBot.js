var Bot = require('./index.js');

function PeBot() {
  Bot.apply(this, Array.prototype.slice.call(arguments));
}

PeBot.prototype = new Bot();


PeBot.prototype.getStudents = require('./jobs/getStudents');
PeBot.prototype.getTimetable = require('./jobs/getTimetable');


module.exports = PeBot;