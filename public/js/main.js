$( function() {
  
function objectConcat() {
  var obj = {};
  var length = arguments.length;
  for ( var i = 0; i < length; i++ ) {
    for ( prop in arguments[i] ) {
      if ( arguments[i].hasOwnProperty( prop )) {
          obj[prop] = arguments[i][prop];
      }
    }
  }
  return obj;
}

  $( '#mainBtn' ).click( function() {
  $.ajax( {
      type: 'GET', 
      url: '/data',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        var template = Handlebars.compile( "<div class='col-md-" + data.widgetOne.col + "'>" + data.widgetOne.template + "</div>\n <div class='col-md-" + data.widgetTwo.col + "'>" + data.widgetTwo.template + "</div>" ),
            remoteContent = objectConcat( data.widgetOne.content, data.widgetTwo.content ),
            content = template( remoteContent ),
            $mainBtn = $( '#mainBtn' ),
            $widgetContainer = $( '#widgetContainer' ),
            $examples = $( '#examples' );

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
      error: function( request, status ) {
        console.log( 'ajax error:', status );
        var data = { "headingOne" : "Ajax Error", "paragraphOne" : "The server respoonse is: " + status, "headingTwo" : "Ajax Error", "paragraphTwo" : "The server respoonse is: " + status };
        var result = template( data );
        $( "#sectionOne, #sectionTwo" ).html( result );
        $( "#mainBtn" ).fadeOut( function() {
          $( '#mainBtn' ).removeClass( 'btn-primary' ).addClass( 'btn-danger' ).html( 'Error!' ).fadeIn();
        });
      }
    }, 'json');
	});

});