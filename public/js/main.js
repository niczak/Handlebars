
$( function() {

	$( '#convert1' ).click( function() {
		var content = $( "#section1" ).html(),
				template = Handlebars.compile( content );
		$.ajax( {
				type: 'GET', 
		    url: '/dataOne',
		    success: function( data, status, request ) {
			    console.log( 'ajax success:', data );
					var result = template( data );
					console.log( result );
					$( "#section1" ).html( result );
					$( "#btn1" ).fadeOut();
		    },
		    error: function( request, status ) {
			    console.log( 'ajax error:', status );
			    var data = { "heading1" : "Ajax Error", "paragraph1" : "The server respoonse is: " + status };
			    var result = template( data );
			    $( "#section1" ).html( result );
			    $( "#btn1" ).hide();
		    }
		  }, 'json');
	});

	$( '#convert2' ).click( function() {
		var content = $( "#section2" ).html(),
				template = Handlebars.compile( content );
		$.ajax( {
				type: 'GET', 
		    url: '/dataTwo',
		    success: function( data, status, request ) {
			    console.log( 'ajax success:', data );
					var result = template( data );
					console.log( result );
					$( "#section2" ).html( result );
					$( "#btn2" ).fadeOut();
		    },
		    error: function( request, status ) {
			    console.log( 'ajax error:', status );
			    var data = { "heading2" : "Ajax Error", "paragraph2" : "The server respoonse is: " + status };
			    var result = template( data );
			    $( "#section2" ).html( result );
			    $( "#btn2" ).hide();
		    }
		  }, 'json');
	});
});