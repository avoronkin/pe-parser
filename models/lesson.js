var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var Grade = new Schema({
  grade: String,
  title: String
});


var LessonSchema = new Schema({
  studentId: {
    required: true,
    type: Number
  },
  subject: {
    required: true,
    type: String
  },
  subjectId: {
    required: true,
    type: Number
  },
  date: {
    required: true,
    type: Date
  },
  grades: [Grade],
  about: String,
  homework: String
});

LessonSchema.index({
  studentId: 1,
  subjectId: 1,
  date: 1
}, {
  unique: true
});

module.exports = mongoose.model('Lesson', LessonSchema);