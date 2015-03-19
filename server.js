var express    = require('express');
var logger     = require('morgan');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var cor        = require('cors');
var db         = require('./config/db');
var testdb     = require('./config/testdb');
var route      = require('./server/routes');


// set default environment to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// use express logger which is morgan!
app.use( logger('dev'));


// use bodyParser for request and parsing info
app.use( bodyParser.urlencoded({extended: true}));
app.use( bodyParser.json());


// use to serve static files like favicon, css, angular and the rest
app.use( express.static( __dirname + '/public'));



//connect to db
mongoose.connect( db.url );

//test db if it has been connected
testdb.dbconnect();

// configure our routes
route(app);

//configure any route whatsoever to redirect to angular
app.get('*', function(req, res) {
    // route to handle creating goes here (app.post)
    // route to handle delete goes here (app.delete)

    // frontend routes =========================================================
    // route to handle all angular requests
     // load the single view file (angular will handle the page changes on the front-end)
    // res.sendFile('./public/index.html');

     res.sendFile(__dirname + '/public/index.html');
});


// listening and serving application on this port
var port = 3030;
app.listen( port, function(){
  console.log("Listening on port ", port );
});