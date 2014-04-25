
/**
 * Module dependencies.
 */

var express = require( 'express' ),
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

app.get('/data', function( req, res ){
  var data = 
  { 
    sectionOne: 
    {
      template: "<h2>{{heading1}}</h2><p>{{paragraph1}}</p>",
      content : { "heading1" : "This is the heading!", "paragraph1" : "This is a bunch of content." }
    },
    sectionTwo: 
    {
      template: "<h2>{{heading2}}</h2><p>{{paragraph2}}</p>",
      content: { "heading2" : "This is the second head!", "paragraph2" : "This is a bunch more content. So dynamic and so snazzy!" }
    }
  }
  res.send( data );
});

http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ));
});
