var studentsPage = require('../../config/pages/students.js');
var studentsParser = require('../../parser/students.js');

module.exports = function(){
  return this.getPageHtml({ url: studentsPage.url, selector: '.page'})
  .then(studentsParser)
  .fail(this.stop);
};