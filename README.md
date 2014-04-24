Handlebars
==========

# A playground for testing the Handlebars JS library.

### Here we will be playing with and likely breaking Handlebars.  Feel free to fork and modify.

## What it is now: 

Here we have a snazzy new handlebars testing sandbox using grunt / bower for task management and project dependencie and a node.js / express for a server.

To use simply clone this repo and then fire off a few commands:

```
npm install
grunt init
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
// click listener
$( '#convert1' ).click( function() {

	// define our template
	var content = $( "#section1" ).html(),
			template = Handlebars.compile( content );

	// request 'dummy data' from the server
	$.ajax( {
			type: 'GET', 
	    url: '/dataOne',
	    success: function( data, status, request ) {
		    console.log( 'ajax success:', data );

		    // compile template with dummy data
				var result = template( data );
				console.log( result );

				// repopulate DOM with compiled result
				$( "#section1" ).html( result );

				//hide the button because it's useless now...
				$( "#btn1" ).fadeOut();
	    },
	    error: function( request, status ) {

	    	// handle an error situation as gracefully as possible

		    console.log( 'ajax error:', status );
		    var data = { "heading1" : "Ajax Error", "paragraph1" : "The server respoonse is: " + status };
		    var result = template( data );
		    $( "#section1" ).html( result );
		    $( "#btn1" ).hide();
	    }
	  }, 'json');
	});

```
 And on the server side the routes have been configured thusly:

 ```javascript
 app.get('/dataOne', function( req, res ){
  var data = { "heading1" : "This is the heading!", "paragraph1" : "This is a bunch of content." };
  res.send( data );
});
```

# This is a work in progress!
There is a plan, and it will all become clear soon!!!


