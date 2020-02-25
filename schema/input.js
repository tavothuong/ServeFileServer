var mongoose = require('mongoose')
var inputSchema = new mongoose.Schema({
   call_id: String,
   values: [
      {
         "name": String,
         "value": String
      }
   ]
});

let Input = mongoose.model('Input', inputSchema);
module.exports = Input