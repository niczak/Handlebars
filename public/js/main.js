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
  
  function buildTemplateString( data ) {
    var template;
    
    for ( widget in data ) {
      console.log( widget );
    }
    
  }

  $( '#mainBtn' ).click( function() {
  $.ajax( {
      type: 'GET', 
      url: '/data',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );
        console.log( data.length );
        
        // times put some stuff together, shall we?
        buildTemplateString( data );

        var template = Handlebars.compile( "<div class='col-md-" + data.list.col + "'>" + data.list.template + "</div>\n <div class='col-md-" + data.article.col + "'>" + data.article.template + "</div>" ),
            remoteContent = objectConcat( data.list.content, data.list.content ),
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