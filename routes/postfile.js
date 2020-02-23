var express = require('express');
var router = express.Router();
var config = require('../config/config')
const fs = require('fs');

var multer = require('multer');
var storage = multer.diskStorage({
   destination: (req, file, cb) => {
      var id = req.params.id
      var type = req.params.type
      const path = config.data_folder + '/' + type + '/' + id;
      if (!fs.existsSync(path)) {
         fs.mkdir(path,function(e){
            if(!e || (e && e.code === 'EEXIST')){
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
      cb(null, req.body.filename);
   }
});
var upload = multer({ storage: storage });
/* POST users listing. */
router.post('/:type/:id', upload.single('file'), function (req, res, next) {
   if (!req.file) {
      res.status(500);
      return next(err);
   }
   res.send('success');
});
module.exports = router;