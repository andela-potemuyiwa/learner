'use strict';

var mongoose = require('mongoose');
var UserModel = require('../models/user.model');

module.exports = {

        root: function( request, response){
            response.send("WELCOME TO TRAINERS API BASE");
        },

        apiRoot: function (request, response) {
            response.send('Welcome to Our Dance Api...Don\'t Get It Twisted');
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

        checkIfUserExists: function( request, response, next ){

            email = request.body[0].email.toLowerCase();

            UserModel.find({ email: email }).exec(function(err, data){
                    if (err) {
                        response.json(err);
                    }

                    response.json({
                        message: 'You have been registered already with that email',
                    });
            });

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


