var cheerio = require('cheerio');
var moment = require('moment');

module.exports = function(html){
  var data = [];
  var days = [];

  $ = cheerio.load(html, {
    ignoreWhitespace: true
  });

  var prevLink = $('.back-forward a').attr('href');
  var prebLinkParts = prevLink.split('/');
  var studentId = parseInt(prebLinkParts[prebLinkParts.length-1], 10);

  var currentDate = $('#date').val();
  var year = currentDate.split('.')[2];

  var months = {
    'января':1,
    'февраля':2,
    'марта':3,
    'апреля':4,
    'мая':5,
    'июня':6,
    'июля':7,
    'августа':8,
    'сентября':9,
    'октября':10,
    'ноября':11,
    'декабря':12
  };

  $('table thead th').each(function(index, element){
    var dayString = $(this).text().trim();
    var dayStringParts = dayString.split(' ');
    var date = dayStringParts[1];
    var month = months[dayStringParts[2]];

    var day = moment(date+'.'+month+'.'+year, "D.M.YYYY").format('DD.MM.YYYY');

    days.push(day);
  });

  $('table tbody tr').not('.lesson-about').each(function(index, element){
    $(this).find('td').each(function(index){
      var $item = $(this);
      var item = {
        studentId: studentId
      };

      var $grades = $item.children('.grade');

      if($grades.length){
        item.grades = [];
        $grades.each(function(){

          item.grades.push({
            title:$(this).attr('title'),
            grade:$(this).text()
          });

        });
      }


      item.subject = $item.children('h5').text().trim();
      item.about = $item.children('.about').text().trim();
      item.homework = $item.children('.homework').text().replace('Домашнее задание:', '').trim();
      item.date = days[index];


      if(item.subject){
        var subjectLink = $item.children('h5').children('a').attr('href');
        var subjectLinkParts = subjectLink.split('/');
        var subjectId = parseInt(subjectLinkParts[subjectLinkParts.length - 1], 10);

        item.subjectId = subjectId;

        data.push(item);
      }

    });
  });

  return data;
};