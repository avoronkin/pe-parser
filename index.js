var Bot = require('./bot');
var Q = require('q');

var timetablePage = require('./pages/timetable.js');
var timetableParcer = require('./parcer/timetable.js');

var studentsPage = require('./pages/students.js');
var studentsParcer = require('./parcer/students.js');

var bot = new Bot();


Q.all([
  bot.getPageHtml({ url: timetablePage.url, selector: '.page' }),
  // bot.getPageHtml({ url: studentsPage.url, selector: '.page'})
  ])
.then(function(results){
  var timetablePageHtml = results[0];
  // var studentsPageHtml = results[1];

  try {
    console.log('data', timetableParcer(timetablePageHtml));
    // console.log('data', studentsParcer(studentsPageHtml));
  }
  catch(error) {
    console.log('error', error);
  }


})
.fail(function(error){
  console.log('error', error);
})
.fin(bot.stop);