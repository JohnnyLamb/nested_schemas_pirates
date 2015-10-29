var express = require('express');
var router = express.Router();
var User = require('../models/users');
var Ship = require('../models/ships');
var mongoose = require('mongoose-q')(require('mongoose'));



router.get('/', function(req, res, next) {
    console.log('for the love!')
  User.find()
    .populate('ships')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });

});


//save a new user
router.post('/', function(req, res, next) {
    var newUser = new User({
      name:req.body.username
    });
    console.log('youre actually hitting this route');
    newUser.saveQ()
    .then(function(result) {
        res.json(result);
    })
    .catch(function(err) {
        res.send(err);
    })
    .done();
});


//save a ship to a user
router.put('/:userid/ships', function(req, res, next) {
    console.log('hitting the right route');
    var newShip = new Ship(req.body);
    newShip.saveQ();

    var update = { $push : {ships : newShip}};
    var options = {new:true};
    var id = req.params.userid;

    User.findByIdAndUpdateQ(id, update, options)
    .populate('ships')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

//list a users ships
router.get('/:userid/ships', function(req, res, next) {
  // var id = req.params.userid;
  console.log("why would this happen? "+req.params.userid);
    User.findById(req.params.userid)
    .populate('ships')
    .exec(function(err, user) {
        if(err) {
            res.send(err);
        } else {
            res.json(user);
        }
    });
});

// get a single user
// router.get('/:userid/', function(req, res, next) {
//   // var id = req.params.userid;
//   console.log(req.params.userid);
//     User.findById(req.params.userid,function(err, user) {
//         if(err) {
//             res.send(err);
//         } else {
//             res.json(user);
//         }
//     });
// });



module.exports = router;
