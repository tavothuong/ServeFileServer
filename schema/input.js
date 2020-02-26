var mongoose = require('mongoose')
var inputSchema = new mongoose.Schema({
   call_id: String,
   values: []
});

let Input = mongoose.model('Input', inputSchema);
module.exports = Input