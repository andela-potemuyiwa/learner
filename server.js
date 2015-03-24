var  express       = require('express'),
     logger        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     cor           = require('cors'),
     db            = require('./config/db'),
     production    = require('./config/production'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes'),
     passport      = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     cookieParser  = require('cookie-parser'),
     session       = require('express-session');

// set default environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 3030;

if( env === 'development'){
  //connect to  development db
  mongoose.connect( db.url );
}
else{
  //connect to production db
  mongoose.connect( production.url );
}



//test db if it has been connected
testdb.dbconnect();

//require all the models
require('./server/models/course.model');
require('./server/models/instructor.model');
require('./server/models/technology.model');
var user = require('./server/models/user.model');





var app = express();

// use express logger which is morgan!
app.use( logger('dev'));


app.use( cookieParser());

// use bodyParser for request and parsing info
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());
app.use( session({ secret: 'learner codes unicodeveloper', resave: true,
    saveUninitialized: true }));
//initialize passport middleware
app.use( passport.initialize());
// Tell passport to use sessions
app.use( passport.session());


// use to serve static files like favicon, css, angular and the rest
app.use( express.static( __dirname + '/public'));

passport.use( new LocalStrategy(
    function( username, password, done){
      user.findOne({ username: username }).exec( function( err, user){
          if( user && user.authenticate( password ) ){
            return done( null, user);
          } else{
            return done( null, false);
          }
      });
    }
));

passport.serializeUser( function( user,done){
  if( user ){
    done( null, user._id );
  }

});

passport.deserializeUser( function(id, done){
  user.findOne({ _id: id }).exec( function(err,user){
    if( user ){
      return done( null, user);
    }else{
      return done( null, false);
    }
  });
});

app.use( function( req, res, next){
  console.log( req.user );
  next();
});


// configure our routes
route(app);

//configure any route whatsoever to redirect to angular
app.get('*', function(req, res) {

    // frontend routes =========================================================
    // route to handle all angular requests
     // load the single view file (angular will handle the page changes on the front-end)
    // res.sendFile('./public/index.html');
     res.sendFile(__dirname + '/public/index.html' );
});


// listening and serving application on this port
app.listen( port, function(){
  console.log("Listening on port ", port );
});