$( function() {

		$( '#mainBtn' ).click( function() {

		$.ajax( {
				type: 'GET', 
		    url: '/data',
		    success: function( data, status, request ) {
			    console.log( 'ajax success:', data );
		
					var templateOne = Handlebars.compile( data.sectionOne.template ),
							templateTwo = Handlebars.compile( data.sectionTwo.template ),
							sectionOneContent = templateOne( data.sectionOne.content ),
							sectionTwoContent = templateTwo( data.sectionTwo.content );

					$( "#sectionOne" ).html( sectionOneContent );
					$( "#sectionTwo" ).html( sectionTwoContent );
					$( "#mainBtn" ).fadeOut( function() {
						$( '#mainBtn' ).removeClass( 'btn-primary' ).addClass( 'btn-success' ).html( 'Gone!' ).fadeIn();
					});
		    },
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