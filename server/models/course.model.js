var mongoose = require('mongoose');
var courseSchema =  mongoose.Schema({
    name:                     { type: String, required: 'Compulsory' },
    description:              { type: String, required: 'Compulsory' },
    course_avatar:            { type: String, required: 'Compulsory'},
    course_video_url:         { type: String, required: 'Compulsory' },
    course_duration:          { type: String, required: 'Compulsory' },
    course_instructor_handle: { type: String, required: 'Compulsory' },
    registered_on:            { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema, 'courses');