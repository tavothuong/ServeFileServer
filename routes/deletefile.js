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
   if (fs.existsSync(path)) {
      // file exists
      fs.unlink(path, function (error) {
         if (error) {
            return res.json({
               success: false,
               message : "Delete file fail"
            })
         }
         return res.json({
            success: true,
            message : "Delete file success"
         })
      });
   }
   else
      res.json({
         success: false,
         message : "File isn't exist"
      });

});

module.exports = router;