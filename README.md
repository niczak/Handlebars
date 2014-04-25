Handlebars
==========

# A playground for testing the Handlebars JS library.

### Here we will be playing with and likely breaking Handlebars.  Feel free to fork and modify.

##What's this?
Here we have a snazzy new handlebars testing sandbox using grunt / bower for task management and project dependencie and a node.js / express for a server.
This is meant to be an example of how you can use Handlebars.js on the client side to send both templates and data over to render content in real-time as well as store that content for reload and only getting new conent when needed.

###Why would I want that?
To put it simply, we envision a situation where you'd want to present a user with something on pageload without having to wait for a massive ajax call to finish. What we're proposing here is that you make a full call for the first load and then you'd be able to display something to the user right away on subsequent vists. This should make everything feel a lot snappier for the end user and result in an overall better experience overall.

---

###So, how do I?

To use simply clone this repo and then fire off a few commands:

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


Open up http://localhost:3000 and you'll see a simple example page. When you click the buttons it will update the content on the page with new content recieved from the server. 

This is how it works on the client-side more or less:

```javascript

// anonymous jquery function
$( function() {

  // click listener
  $( '#mainBtn' ).click( function() {

  // button clicked, let's fire some ajax
  $.ajax( {
      type: 'GET', 

      // use the data route we set up on the server
      url: '/data',
      
      // it worked!!! let's deal with that
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        // Let's compile the returned templates with the returned dummy data
        var templateOne = Handlebars.compile( data.sectionOne.template ),
            templateTwo = Handlebars.compile( data.sectionTwo.template ),
            sectionOneContent = templateOne( data.sectionOne.content ),
            sectionTwoContent = templateTwo( data.sectionTwo.content );

        // Compilation done, stick it into the DOM where it belongs.
        $( "#sectionOne" ).html( sectionOneContent );
        $( "#sectionTwo" ).html( sectionTwoContent );
        
        // We might as well do something fun with the button.
        $( "#mainBtn" ).fadeOut( function() {
          $( '#mainBtn' ).removeClass( 'btn-primary' ).addClass( 'btn-success' ).html( 'Gone!' ).fadeIn();
        });
      },
      
      // here be error handling... it does something similar to the code above, except that it's more error-y
      error: function( request, status ) {
        console.log( 'ajax error:', status );
        var data = { "heading1" : "Ajax Error", "paragraph1" : "The server respoonse is: " + status };
        var result = template( data );
        $( "#sectionOne, #sectionTwo" ).html( result );
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
  // data contains both template and content... it's beautiful, isn't it? elegant.
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
```

# This is a work in progress!
There is a plan, and it will all become clear soon!!!


# Note: This will not make your computer survive acquatic conditions or teach you how to tie a cherry stem. 
