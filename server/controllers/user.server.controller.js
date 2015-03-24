'use strict';

var mongoose = require('mongoose');
var passport = require('passport');
var UserModel = require('../models/user.model');

module.exports = {

    root: function( request, response){
      response.send("WELCOME TO LEANER CODES BASE API");
    },

    apiRoot: function (request, response) {
      response.send('Welcome to Our Learner Api...Don\'t Get It Twisted');
    },

    listUsers: function (request, response, next) {
      UserModel.find(function (err, users) {
          if (err) {
              response.json(err);
          }

          response.json(users);
      });
  },

    getUser: function (request, response, next) {

      var danceName = request.params.name.toLowerCase();

      UserModel.find({name: username}, function (err, dance) {
        if (err) {
          response.status(404).json('Not Found');
        }

        response.json(dance);
      });

    },

    authUser: function( req, res, next){

      var auth = passport.authenticate('local', function( err, user){
          if(err){
              return next(err);
          }
          if(!user){
              res.json({ success: false });
          }

          req.logIn( user, function(err){
              if( err)
              {
                  return next( err );
              }

              res.json({
                  success: true,
                  user: user
              });
          });

      });

      auth( req, res, next );

    },

    logOutUser: function( req, res ){
        req.logout();
        res.end();
    },

    addUser: function (request, response, next) {

      UserModel.create(request.body, function (err, user) {

          if (err) {
              response.json(err);
          }

          response.json({
              message: 'User ' + request.body.username + ' was added to the list of users.',
          });

          next();
      });
    },

    editUser: function (request, response) {
      var danceName = request.params.name.toLowerCase();
      var dance = request.body;

      DanceModel.update({name: danceName}, dance, function (err) {
          if (err) {
              response.status(404).json('Not Found');
          }

          response.status(200).json('Update Successful');

      });
    },

    removeUser: function (request, response) {
      var danceName = request.params.name.toLowerCase();

      DanceModel.remove({name: danceName}, function (err, dance) {

          if (err) {
              response.status(404).json('Not Found');
          }

          response.json('Delete Successful');
      });
    }

};


