'use strict';

var mongoose = require('mongoose');
var CourseModel = require('../models/course.model');

module.exports = {

  listCourses: function (request, response, next) {

    CourseModel.find().populate('instructor_id technology_id').exec( function(err, data){
        if (err) {
            response.json(err);
        }

        response.json( data );

        next();
    });
  },


  getCourse: function (request, response, next) {

    var courseSlug = request.params.course_slug.toLowerCase();

    CourseModel.find({ course_slug: courseSlug }, function (err, courses) {

      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( courses );

      next();
    });

  },

  addCourse: function (request, response, next) {

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

  editCourse: function (request, response) {
    var courseName = request.params.name.toLowerCase();
    var course = request.body;

    CourseModel.update({name: courseName}, course, function (err) {
        if (err) {
            response.status(404).json('Not Found');
        }

        response.status(200).json('Update Successful');

    });
  },

  removeCourse: function (request, response) {
    var courseName = request.params.name.toLowerCase();

    CourseModel.remove({name: courseName}, function (err, dance) {

        if (err) {
            response.status(404).json('Not Found');
        }

        response.json('Delete Successful');
    });
  }
};


