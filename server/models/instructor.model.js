var mongoose = require('mongoose');
var instructorSchema =  mongoose.Schema({
    first_name:               { type: String, required: true },
    last_name:                { type: String, required: true },
    twitter_handle:           { type: String, required: true },
    instructor_avatar:        { type: String, required: true },
    courses:                  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    registered_on:            { type: Date, default: Date.now }
});

module.exports = mongoose.model('Instructor', instructorSchema, 'instructors');