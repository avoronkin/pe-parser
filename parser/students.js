var cheerio = require('cheerio');

module.exports = function(html) {
  var students = [];

  $ = cheerio.load(html, {
    ignoreWhitespace: true
  });


  $('.user-box .heading').each(function(index, element) {
    var $student = $(this);
    var $fio = $student.children('.fio');
    var $profileLink = $fio.children('a');
    var student = {};

    student.fio = $fio.text().trim();

    var profileLink = $profileLink.attr('href');
    var profileLinkParts = profileLink.split('/');
    student.id = parseInt(profileLinkParts[profileLinkParts.length - 1], 10);

    students.push(student);
  });

  return students;
};