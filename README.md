Handlebars
==========

# A playground for testing the Handlebars JS library.

### Here I will be playing with and likely breaking Handlebars.  Feel free to fork and modify.

### Basic usage:

```javascript
// event listener
$(document).on('click', '#convert1', function() {
  // get content section
	var content = $("#section1").html();
	
	// define template
	var template = Handlebars.compile(content);
	
	// define dummy data
	var data = {"heading1" : "This is the heading!", "paragraph1" : "This is a bunch of content."};
	
	// compile template with data
	var result = template(data);
	
	// repopulate DOM with compiled result
	$("#section1").html(result);
	
	// hide the convert button
	$("#btn1").hide();
});

```

