var User = require('./controllers/user.server.controller');
var Course = require('./models/course.model');

    module.exports = function(app) {

        app.get('/api/users', User.listUsers);

        app.post('/api/users', User.addUser );

        app.get('/api/users/:id', function( req,res){

            var param = req.params.id;

            res.json({ "id" : param });
        });

        app.get('/api/courses', function( req, res){
            // use mongoose to get all users in the database
            Course.find(function(err, courses) {

                // if there is an error retrieving, send the error.
                if (err)
                    res.send(err);

                res.json(courses); // return all courses in JSON format
            });

        });



    };

