Handlebars
==========

# A playground for testing the Handlebars JS library.

### Here we will be playing with and likely breaking Handlebars.  Feel free to fork and modify.

##What's this?
Here we have a snazzy new handlebars testing sandbox using grunt / bower for task management and project dependencie and a node.js / express for a server.
This is meant to be an example of how you can use Handlebars.js on the client side to handle dynamically sent conent *and* content and render it in real-time as well as store that content for reload and only getting new content when needed.
Feel free to fork it and play with it and do whatever yout want with it, especially if you can make it better!

###Why would I want that?
To put it simply, we envision a situation where you'd want to present a user with something on pageload without having to wait for an ajax request to finish. What we're proposing here is that you make a full call for the first load so that you're then able to display something to the user right away on subsequent vists while requesting new information in the background. This should make everything feel a lot snappier for the end user and result in a better user experience overall, especially on mobile devices.

---

###So, how do I?

To use simply clone this repo and then fire off a few commands:
(If you really want to see some magic, try out [Codio](http://codio.com) where you can actually clone this repo and run it on one of their sandboxes for free!)

```
npm install
npm install -g grunt grunt-cli bower
bower install
grunt
```

This should, theoretically, get you all of your dependencies locally, set up your grunt tast and then launch your server. You should see a message like: 

```
Running "develop:server" (develop) task
>> started application "app.js".

Running "watch" task
Waiting...Express server listening on port 3000
```

You can change the configuration in Gruntfile.js and app.js if you want different ports and things. 


### Basic usage:


Open up http://localhost:3000 (or your codio url) and you'll see a simple example page. When you click the buttons it will update the content on the page with new content recieved from the server. 

This is how it works on the client-side more or less:

```javascript

// Anonymous function is Anonymous!

$( function() {
  
  // Here we've defined a function to handle the content that comes back from the server

  function processData( data ) {

    // Variables FTW!

    var template = '',
        templateArray = [],
        contentArray = [],
        result = {},
        currentRow = 0,
        lastRow = 0;
    
    // Time to dig into some data and compile our template.
    // This is pretty straight forwad, we're going to dig into the object
    // And pull out everything we need to render the content.

    for ( widget in data ) {
      for ( property in data[widget] ) {
        switch ( property ) {
          case 'row' :
            // This allows us to track which row we're on...
            lastRow = currentRow;
            if ( currentRow < data[widget][property] ) {

              // Knowing that we're creating a new 'row' and it's 
              // not the first, we need to close the last row.

              if ( lastRow !== 0 ) {
                template += '</div>\n';
                templateArray.push('</div>\n');
              }
              currentRow = data[widget][property];
              template += '<div class="row">\n';
              templateArray.push( '<div class="row">\n' )
            }
            break;
          case 'pos' :
            // We're not doing anything with this... yet?
            break;
          case 'col' :
            template += '<div class="col-md-' + data[widget][property] + '">\n';
            templateArray.push( '<div class="col-md-' + data[widget][property] + '">\n' );
            break;
          case 'template' :
            template += data[widget][property];
            templateArray.push( data[widget][property] );
            break;
          case 'content' :
            contentArray.push( data[widget][property] );
            break;
          default :
            break;
        }
      }
      template += '</div>\n';
      templateArray.push( '</div>\n' );
    }
    template += '</div>\n';
    templateArray.push( '</div>\n' );

    // Why an array??? You don't even use it!!!
    // Not so, this was used very successfully in
    // Debugging the string building process as you can 
    // see each step of the way what was pushed in. Handy. 

    console.log( templateArray );

    // Now we compile our template with Handlbars!

    result.template = Handlebars.compile( template );

    // Initialize the content subobject

    result.content = {};
    contentArray.forEach( function( el, idx, arr ) {
      for ( prop in el ) {
        result.content[prop] = el[prop];        
      }
    });

    // Make sure THAT looks good... 

    console.log( result );

    // Spit it out!
    return result;
  }

  $( '#mainBtn' ).click( function() {
  $.ajax( {
      type: 'GET', 
      url: '/data',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        // Moar variables!!!
        // A lot happens here... we process the data,
        // we compile the template,
        // and we declare some jQuery objects.

        var processedData = processData( data ),
            content = processedData.template( processedData.content ),
            $mainBtn = $( '#mainBtn' ),
            $widgetContainer = $( '#widgetContainer' ),
            $examples = $( '#examples' );

        // Now for the visual magic... 

        $mainBtn.fadeOut( function() {
          $mainBtn.removeClass( 'btn-primary' ).addClass( 'btn-success' ).html( 'Gone!' ).fadeIn( function() {
            setTimeout( function(){
              $mainBtn.removeClass( 'btn-success' ).addClass( 'btn-primary' ).html( 'Again?' );
            }, 5000 );
          });
        });
        $widgetContainer.fadeIn( function() {
          $widgetContainer.html( content );
          $examples.hide();
        });
      },

      // Let's take care of an error, shall we?
      // It's never nice to leave the user in the dark. 
      // Also, never not don't use handlebars, right???

      error: function( request, status ) {
        console.log( 'ajax error:', status );
        var template = Handlebars.compile( '<div class="row">\n<div class="col-md-12">\n<h1>{{errorHeading}}</h1>\n<p class="bg-danger">{{errorText}}</p><\n/div>\n</div>\n' );
        var data = { "errorHeading" : "Ajax Error", "errorText" : "The Ajax request failed, the server respoonse was: " + status };
        var result = template( data );
        $( "#widgetContainer" ).html( result );
        $( "#mainBtn" ).fadeOut( function() {
          $( '#mainBtn' ).removeClass( 'btn-primary' ).addClass( 'btn-danger' ).html( 'Error!' ).fadeIn();
        });
      }
    }, 'json');
  });

});

```
 And on the server side we've configured a route thusly:

 ```javascript
app.get('/data', function( req, res ){
  var data = 
  { 
    buttons: 
    {
      row: 1,
      pos: 1,
      col: 12,
      template: "<h2>{{buttonsWidgetHeading}}</h2>\n<div class='btn-group btn-group-justified'>\n{{#each buttonWidgetButtons}}\n<div class='btn-group'>\n<button onclick=\"window.open(\'//{{link}}\', \'_blank\');\" type='button' class='btn {{style}}'>{{#if icon}}<i class='fa {{icon}}'></i> {{/if}}{{buttonName}}</button>\n</div>\n{{/each}}\n</div>\n",
      content : 
        { 
          "buttonWidgetHeading" : "Button Widget Heading",
          "buttonWidgetButtons" : 
              [
                {
                  "buttonName" : "Google Plus",
                  "link" : "plus.google.com.",
                  "icon" : "fa-google-plus",
                  "style" : "btn-success"
                },
                {
                  "buttonName" : "Facebook",
                  "link" : "www.facebook.com",
                  "icon" : "fa-facebook",
                  "style" : "btn-primary"
                },
                {
                  "buttonName" : "Twitter",
                  "link" : "twitter.com",
                  "icon" : "fa-twitter",
                  "style" : "btn-info"
                },
                {
                  "buttonName" : "Pinterest",
                  "link" : "pinterest.com",
                  "icon" : "fa-pinterest",
                  "style" : "btn-warning"
                }
              ]
        }
    },
    feed:
    {
      row: 2,
      pos: 1,
      col: 6,
      template: "<h2>{{feedWidgetHeading}}</h2>\n{{#each feedItems}}\n<div class='panel panel-default'>\n<div class='panel-heading'>{{feedTitle}}</div>\n<div class='panel-body'>\n<p>{{feedMessage}}</p>\n</div>\n<div class='panel-footer text-muted'>\n<small>{{feedDate}}</small>\n</div>\n</div>\n{{/each}}\n",
      content: 
        { 
          "feedWidgetHeading" : "Feed Widget Heading", 
          "feedItems" : 
            [ 
              { 
                "feedTitle" : "Feed_Item_One", 
                "feedMessage" : "Feed message one goes here...", 
                "feedDate" : "April 25, 2014"
              }, 
              { 
                "feedTitle" : "Feed_Item_Two", 
                "feedMessage" : "Feed message two goes here...", 
                "feedDate" : "April 25, 2014" 
              }, 
              { 
                "feedTitle" : "Feed_Item_Three", 
                "feedMessage" : "Feed message three goes here...", 
                "feedDate" : "April 25, 2014"
              }, 
              { 
                "feedTitle" : "Feed_Item_Four", 
                "feedMessage" : "Feed message four goes here...",
                "feedDate" : "April 25, 2014"
              }, 
              { 
                "feedTitle" : "Feed_Item_Five", 
                "feedMessage" : "Feed message five goes here...",
                "feedDate" : "April 25, 2014"
              },
            ]
        }
    },
    article: 
    {
      row: 2,
      pos: 2,
      col: 6,
      template: "<h2>{{articleWidgetHeading}}</h2>\n{{#each articleWidgetParagraph}}\n<p>{{this}}</p>\n{{/each}}\n",
      content: 
        { 
          "articleWidgetHeading" : "Article Widget Heading", 
          "articleWidgetParagraph" : 
              [ 
              "Helvetica 90's post-ironic disrupt fingerstache messenger bag. Godard 90's paleo Thundercats, single-origin coffee artisan gluten-free PBR&B narwhal ennui Truffaut meh. Pinterest squid bespoke pork belly. Viral retro narwhal YOLO banjo, kogi occupy biodiesel cred literally whatever mumblecore chillwave. Sriracha plaid polaroid Cosby sweater blog slow-carb. Marfa American Apparel meh Brooklyn cray umami whatever chia salvia, gluten-free hella Helvetica Vice hashtag. Hashtag Neutra pickled pour-over.",
              "Sustainable slow-carb skateboard selvage Shoreditch, cardigan scenester Wes Anderson Brooklyn. Roof party tousled cliche Cosby sweater, XOXO Pinterest church-key Thundercats letterpress before they sold out gluten-free chillwave photo booth +1. Messenger bag Brooklyn XOXO 8-bit, pour-over kale chips artisan mumblecore fap salvia Pinterest put a bird on it Etsy pop-up. Cliche church-key before they sold out fingerstache Thundercats, viral retro Wes Anderson put a bird on it XOXO letterpress. Selvage flexitarian umami mlkshk, quinoa raw denim narwhal pickled. Umami photo booth banh mi you probably haven't heard of them, brunch gentrify direct trade pickled fixie synth church-key. Narwhal Tonx PBR&B seitan readymade, Neutra chillwave Schlitz lo-fi hashtag gentrify McSweeney's deep v trust fund.",
              "DIY wolf four loko, Carles actually Marfa church-key selvage. Pork belly tousled hashtag kitsch. Pug sustainable Banksy small batch. You probably haven't heard of them ennui plaid slow-carb. Ethnic mlkshk tattooed, sustainable lo-fi single-origin coffee artisan seitan Neutra. 90's 3 wolf moon Carles, Vice before they sold out Odd Future tote bag chia Tonx Neutra put a bird on it. Sriracha food truck dreamcatcher artisan butcher.",
              "Actually twee Cosby sweater Truffaut, organic McSweeney's forage tofu stumptown brunch. Bitters DIY hoodie, tousled PBR&B PBR Brooklyn quinoa 90's banh mi Odd Future disrupt flannel. Etsy mlkshk fashion axe, kitsch American Apparel cornhole normcore hashtag PBR Truffaut. Truffaut blog Blue Bottle, forage ugh swag polaroid hoodie kale chips raw denim cornhole cred fashion axe occupy. Tote bag literally yr organic, Williamsburg kitsch whatever direct trade single-origin coffee iPhone gentrify bespoke post-ironic. Wayfarers church-key art party, kogi artisan Vice occupy Wes Anderson Cosby sweater drinking vinegar Portland literally High Life selvage. Thundercats aesthetic lo-fi, Schlitz keytar master cleanse Blue Bottle craft beer." 
            ]
        }
    }
  }
  res.send( data );
});
```

This is all pretty self explanatory. We'll be moving this logic out to a route soon, but for now... it's functional. 

# This is a work in progress!
To see more about what's coming as we go, check out the [issues](http://github.com/niczak/Handlebars/issues/).


#### Note: This will not make your computer survive acquatic [conditions](https://www.youtube.com/watch?v=HLUX0y4EptA) or teach you how to tie a cherry stem. 
