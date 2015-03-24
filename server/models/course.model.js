var mongoose = require('mongoose');
var courseSchema =  mongoose.Schema({
    name:                     { type: String, required: true },
    description:              { type: String, required: true },
    course_avatar:            { type: String, required: true },
    course_video_url:         { type: String, required: true },
    course_slug:              { type: String, required: true },
    course_duration:          { type: String, required: true },
    instructor_id:            { type: mongoose.Schema.Types.ObjectId, ref: 'Instructor' },
    technology_id:            { type: mongoose.Schema.Types.ObjectId, ref: 'Technology' },
    registered_on:            { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', courseSchema, 'courses');