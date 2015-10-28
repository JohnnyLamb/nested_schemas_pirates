var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'));
var User = require('../models/users');
var Ship = require('../models/ships');



// get all ships
router.get('/', function(req, res, next) {
  Ship.find(function(err, response) {
    if (err) {
      res.json({
        message: err
      });
    } else {
      res.json(response);
    }
  });

});

//save a new ship
router.post('/', function(req, res, next) {
  var newShip = new Ship({
    name: req.body.name,
    missions: req.body.missions
  });
  console.log(req.body.name);
  newShip.saveQ()
    .then(function(result) {
      res.json(result);
    })
    .catch(function(err) {
      res.send(err);
    })
    .done();
});

//delete a ship
router.delete('/:shipid', function(req, res, next) {
  // var id = req.params.userid;
  // console.log(req.params.userid);
  // User.findById(req.params.userid,function(err,data){
  //   if(err){
  //     res.send(err);
  //   } else{
  //     res.json(data);
  //   }
  // });
  Ship.findByIdAndRemove(req.params.shipid, function(err, data) {
    if (err) {
      res.send(err);
    } else {
      res.json(data);
    }
  });

});





module.exports = router;
