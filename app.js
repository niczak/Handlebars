
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
    widgetOne: 
    {
      row: 1,
      pos: 1,
      col: 6,
      type: 'listWidget',
      template: "<h2>{{listWidgetHeading}}</h2><p>{{listWidgetParagraph}}</p>\n<ul>{{#each listWidgetList}}<li>{{this}}</li>{{/each}}</ul>",
      content : { "listWidgetHeading" : "List Widget Heading", "listWidgetParagraph" : "This is descriptive content for the list.", "listWidgetList" : [ 'list_item_one', 'list_item_two', 'list_item_three', 'list_item_four', 'list_item_five', 'list_item_six', 'list_item_seven', 'list_item_eight', 'list_item_nine', 'list_item_ten' ] }
    },
    widgetTwo: 
    {
      row: 1,
      pos: 2,
      col: 6,
      type: "articleWidget",
      template: "<h2>{{articleWidgetHeading}}</h2>{{#each articleWidgetParagraph}}<p>{{this}}</p>{{/each}}",
      content: { "articleWidgetHeading" : "Article Widget Heading", "articleWidgetParagraph" : [ "Street art selfies dreamcatcher photo booth shabby chic ethnic. Flannel readymade small batch ennui mumblecore, deep v fingerstache 3 wolf moon lo-fi hoodie selfies next level Tumblr. Photo booth gastropub tattooed Marfa PBR McSweeney's. Austin flannel vinyl Brooklyn Neutra, direct trade Intelligentsia wayfarers shabby chic viral XOXO banh mi mlkshk slow-carb Marfa. Photo booth Odd Future narwhal bicycle rights shabby chic wolf Cosby sweater stumptown McSweeney's. Truffaut photo booth plaid sartorial keffiyeh actually, cray tousled lo-fi meggings kale chips retro ennui master cleanse. Austin kitsch street art chambray, readymade sartorial keytar photo booth vinyl pickled tote bag Portland.", "Sustainable slow-carb skateboard selvage Shoreditch, cardigan scenester Wes Anderson Brooklyn. Roof party tousled cliche Cosby sweater, XOXO Pinterest church-key Thundercats letterpress before they sold out gluten-free chillwave photo booth +1. Messenger bag Brooklyn XOXO 8-bit, pour-over kale chips artisan mumblecore fap salvia Pinterest put a bird on it Etsy pop-up. Cliche church-key before they sold out fingerstache Thundercats, viral retro Wes Anderson put a bird on it XOXO letterpress. Selvage flexitarian umami mlkshk, quinoa raw denim narwhal pickled. Umami photo booth banh mi you probably haven't heard of them, brunch gentrify direct trade pickled fixie synth church-key. Narwhal Tonx PBR&B seitan readymade, Neutra chillwave Schlitz lo-fi hashtag gentrify McSweeney's deep v trust fund.", "DIY wolf four loko, Carles actually Marfa church-key selvage. Pork belly tousled hashtag kitsch. Pug sustainable Banksy small batch. You probably haven't heard of them ennui plaid slow-carb. Ethnic mlkshk tattooed, sustainable lo-fi single-origin coffee artisan seitan Neutra. 90's 3 wolf moon Carles, Vice before they sold out Odd Future tote bag chia Tonx Neutra put a bird on it. Sriracha food truck dreamcatcher artisan butcher.", "Actually twee Cosby sweater Truffaut, organic McSweeney's forage tofu stumptown brunch. Bitters DIY hoodie, tousled PBR&B PBR Brooklyn quinoa 90's banh mi Odd Future disrupt flannel. Etsy mlkshk fashion axe, kitsch American Apparel cornhole normcore hashtag PBR Truffaut. Truffaut blog Blue Bottle, forage ugh swag polaroid hoodie kale chips raw denim cornhole cred fashion axe occupy. Tote bag literally yr organic, Williamsburg kitsch whatever direct trade single-origin coffee iPhone gentrify bespoke post-ironic. Wayfarers church-key art party, kogi artisan Vice occupy Wes Anderson Cosby sweater drinking vinegar Portland literally High Life selvage. Thundercats aesthetic lo-fi, Schlitz keytar master cleanse Blue Bottle craft beer." ] }
    }
  }
  res.send( data );
});

http.createServer( app ).listen( app.get( 'port' ), function() {
  console.log( "Express server listening on port " + app.get( 'port' ));
});
