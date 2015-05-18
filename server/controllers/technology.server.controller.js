'use strict';

var mongoose = require('mongoose');
var TechModel = require('../models/technology.model');

module.exports = {

  listTechnologies: function (request, response, next) {

    TechModel.find().exec( function(err, data){
        if (err) {
            response.json(err);
        }

        response.json( data );

        next();
    });
  },

  getTechnology: function (request, response) {

    var techName = request.params.tech_slug;

    TechModel.find({ technology_slug: techName }).populate('courses').exec( function (err, tech) {
      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( tech );

    });
  },

  getCoursesUnderTechnology: function (request, response ) {

    var techName = request.params.tech_slug;

    TechModel.find({ technology_slug: techName }).populate('courses').exec( function (err, tech) {
      if (err) {
        response.status(404).json('Not Found');
      }

      response.json( tech );
    });
  },

  addTechnology: function (request, response, next) {

    TechModel.create(request.body, function (err, user) {
        if (err) {
            response.json(err);
        }

        response.json({
            message: 'Technology:  ' + request.body.name + ' was successfully added to the list of Technologies',
        });
        next();
    });
  },

  editTechnology: function (request, response) {
    var techName = request.params.name.toLowerCase();
    var technology = request.body;

    TechModel.update({name: techName}, technology, function (err) {
        if (err) {
            response.status(404).json('Not Found');
        }

        response.status(200).json('Update Successful');

    });
  },

  removeTechnology: function (request, response) {
    var techName = request.params.name.toLowerCase();

    TechModel.remove({name: techName}, function (err, dance) {

        if (err) {
            response.status(404).json('Not Found');
        }

        response.json('Delete Successful');
    });
  }
};


