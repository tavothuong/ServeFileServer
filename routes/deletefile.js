var express = require('express');
var router = express.Router();
var config = require('../config/config')
const fs = require('fs')

/* DELETE file listing. */
router.delete('/:type/:id/:filename', function (req, res) {
   var id = req.params.id
   var type = req.params.type
   var filename = req.params.filename
   const path = config.data_folder + '/' + type + '/' + id + '/' + filename
   try {
      if (fs.existsSync(path)) {
         // file exists
         fs.unlink(path, function (error) {
            if (error) {
               res.send('delete fail')
            }
            res.send('delete success')
         });
      }
   } catch (err) {
      res.send('file not found');
   }
});

module.exports = router;