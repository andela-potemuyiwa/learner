require('dotenv').load();
var  express       = require('express'),
     logger        = require('morgan'),
     bodyParser    = require('body-parser'),
     mongoose      = require('mongoose'),
     cor           = require('cors'),
     secrets       = require('./config/secrets'),
     testdb        = require('./config/testdb'),
     route         = require('./server/routes'),
     passport      = require('passport'),
     LocalStrategy = require('passport-local').Strategy,
     cookieParser  = require('cookie-parser'),
     session       = require('express-session'),
     prerender     = require('prerender-node');

/**
 *  Set default environment to development
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var port = process.env.PORT || 3030;

/**
 * Connect to MongoDB.
 */
testdb.dbconnect();

/**
 * Require all the models
 */
require('./server/models/course.model');
require('./server/models/instructor.model');
require('./server/models/technology.model');
var user = require('./server/models/user.model');

/**
 * Create Express server.
 */
var app = express();

/**
 * Express configuration.
 */
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true})); //use bodyParser for request and parsing info
app.use(bodyParser.json());
app.use(session({
  secret: secrets.sessionSecret,
  resave: true,
  saveUninitialized: true }));
app.use(passport.initialize()); //initialize passport middleware
app.use(passport.session()); //Tell passport to use sessions
app.use(prerender.set('prerenderToken', secrets.prerenderToken)) //Tell prerender.io to serve your cached pages to improve SEO
app.use( express.static( __dirname + '/public')); //use to serve static files like favicon, css, angular and the rest

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

passport.serializeUser(function(user,done){
  if(user){
    done(null, user._id);
  }
});

passport.deserializeUser(function(id, done){
  user.findOne({ _id: id }).exec(function(err,user){
    if(user){
      return done( null, user);
    }else{
      return done( null, false);
    }
  });
});


app.use(function(req, res, next){
  console.log( req.user );
  next();
});

/**
 * Routes Configuration
 */
route(app);

//configure any route whatsoever to redirect to angular
app.get('*', function(req, res) {
    /** frontend routes =========================================================
      * route to handle all angular requests
      * load the single view file (angular will handle the page changes on the front-end)
      **/
     res.sendFile(__dirname + '/public/index.html' );
});

/**
 * Start Express server.
 */
app.listen( port, function(){
  console.log("learner Server Listening on port ", port );
});