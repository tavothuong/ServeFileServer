var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Input = require('../schema/input')
var Output = require('../schema/output')
var Request_form = require('../schema/request_form')
router.get('/input/:call_id/:id/', function (req, res, next) {
   var id = req.params.id
   var call_id = req.params.call_id

   Input.find({ _id: id }, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].call_id != call_id) {
         return res.json({
            success: false,
            message: "call_id don't have permission"
         })
      }
      return res.json({
         success: true,
         message: "Exist",
         result: {
            values: result[0].values
            // .map(item => {
            //    return {
            //       name: item.name,
            //       value: item.value
            //    }
            // })
         }
      })
   })

});

router.get('/output/:call_id/:id/', function (req, res, next) {
   var id = req.params.id
   var call_id = req.params.call_id

   Output.find({ _id: id }, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].call_id != call_id) {
         return res.json({
            success: false,
            message: "call_id don't have permission"
         })
      }
      return res.json({
         success: true,
         message: "Exist",
         result: {
            values: result[0].values,
            error: result[0].error
         }
      })
   })

});

router.get('/requestform/:app_id/:id/', function (req, res, next) {
   var id = req.params.id
   var app_id = req.params.app_id

   Request_form.find({ _id: id }, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].app_id != app_id) {
         return res.json({
            success: false,
            message: "call_id don't have permission"
         })
      }
      return res.json({
         success: true,
         message: "Exist",
         result: {
            fields: result[0].fields
            // .map(item => {
            //    return {
            //       name: item.name,
            //       label: item.label,
            //       _type: item._type
            //    }
            // })
         }
      })
   })

});

router.post('/input/:call_id/', function (req, res, next) {
   var call_id = req.params.call_id
   var values = req.body.values
   var input = new Input({
      call_id: call_id,
      values: values
   })
   input.save((errors, doc) => {
      if (errors) {
         res.json({
            success: false,
            message: "Some thing wrong when save"
         })
      }
      else {
         res.json({
            success: true,
            message: "Success",
            result: { id: doc._id }
         })
      }
   });

});

router.post('/output/:call_id/', function (req, res, next) {
   var call_id = req.params.call_id
   var values = req.body.values
   var error = req.body.error
   var output = new Output({
      call_id: call_id,
      values: values,
      error: error
   })
   output.save((errors, doc) => {
      if (errors) {
         res.json({
            success: false,
            message: "Some thing wrong when save"
         })
      }
      else {
         res.json({
            success: true,
            message: "Success",
            result: { id: doc._id }
         })
      }
   });

});

router.post('/requestform/:app_id/', function (req, res, next) {
   var app_id = req.params.app_id
   var fields = req.body.fields
   var request = new Request_form({
      app_id: app_id,
      fields: fields
   })
   request.save((errors, doc) => {
      if (errors) {
         console.log(errors)
         res.json({
            success: false,
            message: "Some thing wrong when save"
         })
      }
      else {
         res.json({
            success: true,
            message: "Success",
            result: { id: doc._id }
         })
      }
   });

});

router.delete('/input/:call_id/:id', function (req, res, next) {
   var id = req.params.id
   var call_id = req.params.call_id
   Input.find({ _id: id}, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].call_id != call_id) {
         return res.json({
            success: false,
            message: "call_id don't have permission"
         })
      }
      Input.deleteOne({ _id: id, call_id: call_id })
         .then((doc) => res.json({
            success: true,
            message: "success"
         }))
         .catch(e => res.json({
            success: false,
            message: "fail"
         }));
   })

});

router.delete('/output/:call_id/:id', function (req, res, next) {
   var id = req.params.id
   var call_id = req.params.call_id
   Output.find({ _id: id }, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].call_id != call_id) {
         return res.json({
            success: false,
            message: "call_id don't have permission"
         })
      }
      Output.deleteOne({ _id: id, call_id: call_id })
         .then((doc) => res.json({
            success: true,
            message: "success"
         }))
         .catch(e => res.json({
            success: false,
            message: "fail"
         }));
   })
});

router.delete('/requestform/:app_id/:id', function (req, res, next) {
   var id = req.params.id
   var app_id = req.params.app_id
   Request_form.find({ _id: id}, (err, result) => {
      if (err || !result[0]) {
         return res.json({
            success: false,
            message: "Not exist"
         })
      }
      if (result[0].app_id != app_id) {
         return res.json({
            success: false,
            message: "app_id don't have permission"
         })
      }
      Request_form.deleteOne({ _id: id, app_id: app_id })
         .then((doc) => res.json({
            success: true,
            message: "success"
         }))
         .catch(e => res.json({
            success: false,
            message: "fail"
         }));
   })

});

module.exports = router;