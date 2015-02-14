var config = require('../../config');

module.exports = {
  url: config.peHost + '/dnevnik/timetable/',
  el: {
    page: '.page',
    table: '.week-lessons'
  }
};