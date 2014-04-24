
/**
 * Module dependencies.
 */

var express = require( 'express' ),
    exphbs  = require( 'express3-handlebars' ),
    routes = require( './routes' ),
    user = require( './routes/user' ),
    http = require( 'http' ),
    path = require( 'path' );

var app = express();

app.configure( function() {
  app.set( 'port', process.env.PORT || 3000 );
  app.set( 'views', __dirname + '/views' );
  app.use( express.favicon() );
  app.use( express.logger( 'dev' ) );
  app.use( express.bodyParser() );
  app.use( express.methodOverride() );
  app.use( app.router );
  app.use( express.static( path.join( __dirname, 'public' )));
});

app.configure('development', function(){
  app.use( express.errorHandler() );
});

app.get('/dataOne', function( req, res ){
  var data = { "heading1" : "This is the heading!", "paragraph1" : "This is a bunch of content." };
  res.send( data );
});

app.get('/dataTwo', function( req, res ){
  var data = { "heading2" : "This is the second head!", "paragraph2" : "This is a bunch more content. So dynamic and so snazzy!" };
  res.send( data );
});

http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ));
});
