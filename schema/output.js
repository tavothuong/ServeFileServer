var mongoose = require('mongoose')
var outputSchema = new mongoose.Schema({
   call_id: String,
   values: {},
   error: String
});

let Output = mongoose.model('Output', outputSchema);
module.exports = Output