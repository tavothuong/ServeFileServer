var express = require('express');
var router = express.Router();
var config = require('../config/config')
const fs = require('fs')

/* GET file listing. */
router.get('/:type/:id/:filename', function (req, res, next) {
  var id = req.params.id
  var type = req.params.type
  var filename = req.params.filename
  const path = config.data_folder + '/' + type + '/' + id + '/' + filename

  try {
    if (fs.existsSync(path)) {
      //file exists
      res.download(path)
    }
  } catch (err) {
    res.send('file not found');    
  }
  
});



module.exports = router;