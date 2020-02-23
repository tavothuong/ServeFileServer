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

  if (fs.existsSync(path)) {
    //file exists
    return res.download(path)
  }
  res.json({
    success: false,
    message: "File isn't exist"
  });

});



module.exports = router;