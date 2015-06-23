'use strict';

var InstructorModel = require('../models/instructor.model');

module.exports = {

  listInstructors: function (request, response, next) {

    InstructorModel.find().exec( function(err, data){
      if (err) {
          response.json(err);
      }

      response.json( data );

      next();
    });
  },

  getEachInstructor: function (request, response, next) {

    var twitterHandle = request.params.twitter_handle.toLowerCase();

    InstructorModel.find({ twitter_handle: twitterHandle }).populate('courses').exec( function (err, instructor ) {

      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( instructor );

      next();
    });
  },

  getInstructorById: function (request, response) {

    var id = request.params.id.toLowerCase();

    InstructorModel.find({ _id: id }).populate('courses').exec( function (err, instructor ) {

      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( instructor );


    });
  },

  getEachInstructorCourses: function (request, response ) {

    var twitterHandle = request.params.twitter_handle.toLowerCase();

    InstructorModel.find({ twitter_handle: twitterHandle }).populate('courses').exec( function (err, instructor ) {

      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( instructor[0].courses );

    });
  },

  addInstructor: function (request, response, next) {

    CourseModel.create(request.body, function (err, user) {

        if (err) {
            response.json(err);
        }

        response.json({
            message: 'Course:  ' + request.body.name + ' was successfully added to the list of courses.',
        });

        next();
    });
  },

  editInstructorDetails: function (request, response) {
    var courseName = request.params.name.toLowerCase();
    var course = request.body;

    CourseModel.update({name: courseName}, course, function (err) {
        if (err) {
            response.status(404).json('Not Found');
        }

        response.status(200).json('Update Successful');

    });
  },

  removeInstructor: function (request, response) {
    var courseName = request.params.name.toLowerCase();

    CourseModel.remove({name: courseName}, function (err, dance) {

        if (err) {
            response.status(404).json('Not Found');
        }

        response.json('Delete Successful');
    });
  }
};


