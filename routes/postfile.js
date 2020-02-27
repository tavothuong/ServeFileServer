var express = require('express');
var router = express.Router();
var config = require('../config/config')
const fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      var id = req.params.id
      var type = req.params.type
      var path
      if (req.params.version) {
         path = config.data_folder + '/' + type + '/' + id + '/' + req.params.version;
      }
      else {
         path = config.data_folder + '/' + type + '/' + id;
      }
      if (!fs.existsSync(path)) {
         fs.mkdirSync(path, { recursive: true }, function (e) {
            if (!e || (e && e.code === 'EEXIST')) {
               //do something with contents
            } else {
               //debug
               console.log(e);
            }
         })
      }
      cb(null, path);
   },
   filename: (req, file, cb) => {
      console.log(file);
      cb(null, req.params.filename);
   }
});
var upload = multer({ storage: storage });
/* POST users listing. */
router.post('/:type/:id/:filename', upload.single('file'), function (req, res, next) {
   if (!req.file) {
      res.json({
         success: false,
         message: "File upload isn't exist"
      });
      return next(err);
   }
   res.json({
      success: true,
      message: "Upload file success"
   })
});

router.post('/:type/:id/:version/:filename', upload.single('file'), function (req, res, next) {
   if (!req.file) {
      res.status(500);
      return next(err);
   }
   res.json({
      success: true,
      message: "Upload file success"
   })
});
module.exports = router;