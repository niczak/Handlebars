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

This is part of the magic on the client side:

```javascript

// Anonymous function is Anonymous!

$( function() {

    {...}

  // Here we've defined a function to handle the content that comes back from the server

    function processTemplates( templates ) {

    // Variables FTW!

    var template = '',
        templateArray = [],
        currentRow = 0,
        lastRow = 0;

    // Time to drill into the template data!
    // At this point we just need to extract each template and
    // put it all together for the page.

    for ( widget in templates ) {
      for ( property in templates[widget] ) {
        switch ( property ) {
          case 'row' :

            // Knowing which row we're on helps close <div> tags when needed

            lastRow = currentRow;
            if ( currentRow < templates[widget][property] ) {
              if ( lastRow !== 0 ) {

                // Knowing that we're creating a new 'row' and it's
                // not the first, we need to close the last row.

                templateArray.push('</div>');
              }
              currentRow = templates[widget][property];
              templateArray.push( '<div class="row">' )
            }
            break;
          case 'pos' :
            // We're not doing anything with this... yet?
            break;
          case 'col' :
            templateArray.push( '<div class="col-md-' + templates[widget][property] + '">' );
            break;
          case 'template' :
            templateArray.push( templates[widget][property] );
            break;
          default :
            break;
        }
      }
      templateArray.push( '</div>' );
    }
    templateArray.push( '</div>' );

    // We did it!!! Congrats!!! Make it a string.

    template = templateArray.join( '\n' );
    return template;
  }

  {...}
```
 And on the server side we've configured a route thusly:

 ```javascript

var app = module.parent.exports.app,
    helper = require( './helper' );

app.get( '/templates', function( req, res ) {
  var templates =
  {
    buttons: {
        row: 1,
        pos: 1,
        col: 12,
        template: "<h2>{{buttonsWidgetHeading}}</h2>\n<div class='btn-group btn-group-justified'>\n{{#each buttonWidgetButtons}}\n<div class='btn-group'>\n<button onclick=\"window.open(\'//{{link}}\', \'_blank\');\" type='button' class='btn {{style}}'>{{#if icon}}<i class='fa {{icon}}'></i> {{/if}}{{buttonName}}</button>\n</div>\n{{/each}}\n</div>\n"
    },
    feed: {
        row: 2,
        pos: 1,
        col: 6,
        template: "<h2>{{feedWidgetHeading}}</h2>\n{{#each feedItems}}\n<div class='panel panel-default'>\n<div class='panel-heading'>{{feedTitle}}</div>\n<div class='panel-body'>\n<p>{{feedMessage}}</p>\n</div>\n<div class='panel-footer text-muted'>\n<small>{{feedDate}}</small>\n</div>\n</div>\n{{/each}}\n"
    },
    articles: {
        row: 2,
        pos: 2,
        col: 6,
        template: "<h2>{{articleWidgetHeading}}</h2>\n{{#each articleWidgetParagraph}}\n<p>{{this}}</p>\n{{/each}}\n"
    }
  }
  res.send( templates );
});

app.get( '/content', function( req, res ) {

  var today = helper.getCurrentDate();
  helper.getHipsterIpsum( function( pArray ) {
  var content =
      {
        buttons:
        {
          "buttonWidgetHeading" : "Button Widget Heading",
          "buttonWidgetButtons" :
          [
            {
              "buttonName" : "Google Plus",
              "link" : "plus.google.com",
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
      },
      feed:
      {
        "feedWidgetHeading" : "Feed Widget Heading",
        "feedItems" :
        [
          {
            "feedTitle" : "Feed_Item_One",
            "feedMessage" : "Feed message one goes here...",
            "feedDate" : today + ' @ ' + time
          },
          {
            "feedTitle" : "Feed_Item_Two",
            "feedMessage" : "Feed message two goes here...",
            "feedDate" : today + ' @ ' + time
          },
          {
            "feedTitle" : "Feed_Item_Three",
            "feedMessage" : "Feed message three goes here...",
            "feedDate" : today + ' @ ' + time
          },
          {
            "feedTitle" : "Feed_Item_Four",
            "feedMessage" : "Feed message four goes here...",
            "feedDate" : today + ' @ ' + time
          },
          {
            "feedTitle" : "Feed_Item_Five",
            "feedMessage" : "Feed message five goes here...",
            "feedDate" : today + ' @ ' + time
          },
        ]
      },
      articles:
      {
        "articleWidgetHeading" : "Article Widget Heading",
        "articleWidgetParagraph" :
        [
          pArray[0],
          pArray[1],
          pArray[2],
          pArray[3],
        ]
      }
    }
  res.send( content );
  });
});
```

This is all pretty self explanatory. We'll be moving this logic out to a route soon, but for now... it's functional.

# This is a work in progress!
To see more about what's coming as we go, check out the [issues](http://github.com/niczak/Handlebars/issues/).


#### Note: This will not make your computer survive acquatic [conditions](https://www.youtube.com/watch?v=HLUX0y4EptA) or teach you how to tie a cherry stem.
