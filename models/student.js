var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var StudentSchema = new Schema({
  fio: String,
  id: {
    type: Number,
    required: true,
    unique: true
  }
});

module.exports = mongoose.model('Student', StudentSchema);