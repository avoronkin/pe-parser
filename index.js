var getStudentsJob = require('./jobs/getStudents');

getStudentsJob(function(error) {
  if (error) {
    console.log('job get students - error:', error);
  } else {
    console.log('job get students - done');
  }
});