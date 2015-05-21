var User       = require('./controllers/user.server.controller');
var Course     = require('./controllers/course.server.controller');
var Tech       = require('./controllers/technology.server.controller');
var Instructor = require('./controllers/instructor.server.controller');
var passport   = require('passport');

module.exports = function(app) {

  app.get('/api/users',   User.listUsers);
  app.post('/api/users',  User.addUser);
  app.get('/api/users/:id', User.getUser);

  app.post('/login', User.authUser);
  app.post('/logout', User.logOutUser);

  app.get('/news', News.getNews);
  app.get('/challenges', Challenge.getChallenges);

  app.get('/api/courses',  Course.listCourses);
  app.get('/api/courses/:course_slug',  Course.getCourse);
  app.post('/api/courses', Course.addCourse);

  app.get('/api/technologies',  Tech.listTechnologies);
  app.get('/api/technologies/:tech_slug', Tech.getTechnology);
  app.get('/api/technologies/:tech_slug/courses', Tech.getCoursesUnderTechnology);
  app.post('/api/technologies', Tech.addTechnology);

  app.get('/api/instructors/', Instructor.listInstructors);
  app.get('/api/instructors/:id', Instructor. getInstructorById);
  app.get('/api/instructors/:twitter_handle', Instructor.getEachInstructor);
  app.get('/api/instructors/:twitter_handle/courses', Instructor.getEachInstructorCourses);

};

