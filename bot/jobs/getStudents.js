var studentsPage = require('../../config/pages/students.js');
var studentsParcer = require('../../parcer/students.js');

module.exports = function(){
  return this.getPageHtml({ url: studentsPage.url, selector: '.page'})
  .then(studentsParcer)
  .fail(this.stop);
};