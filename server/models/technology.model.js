var mongoose = require('mongoose');
var technologySchema =  mongoose.Schema({
    name:                     { type: String, required: true },
    description:              { type: String, required: true },
    technology_avatar:        { type: String, required: true },
    technology_slug:          { type: String, required: true },
    courses:                  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

module.exports = mongoose.model('Technology', technologySchema, 'technologies');