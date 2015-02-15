var timetablePage = require('../../config/pages/timetable.js');
var timetableParser = require('../../parser/timetable.js');

module.exports = function(options){
  ///dnevnik/timetable/index/mode/parent/student/1360000036242/switcher/f1?date=14.02.2015
  var url = timetablePage.url;
  if(options && options.studentId){
    url = url + 'index/mode/parent/student/' + options.studentId + '/switcher/f1';
  }
  if(options && options.date){
    url = url + '?date=' + options.date;
  }

  return this.getPageHtml({ url: url, selector: '.page'})
  .then(timetableParser)
  .fail(this.stop);
};