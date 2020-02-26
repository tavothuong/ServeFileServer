var mongoose = require('mongoose')
var requestSchema = new mongoose.Schema({
   app_id: String,
   fields: [
   ]
});

let Request_form = mongoose.model('Request_form', requestSchema);
module.exports = Request_form 