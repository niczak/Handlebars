$( function() {
  
  function processData( data ) {
    var template = '',
        templateArray = [],
        contentArray = [],
        result = {},
        currentRow = 0,
        lastRow = 0;
    
    for ( widget in data ) {
      for ( property in data[widget] ) {
        switch ( property ) {
          case 'row' :
            lastRow = currentRow;
            if ( currentRow < data[widget][property] ) {
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
    console.log( templateArray );
    result.template = Handlebars.compile( template );
    result.content = {};
    contentArray.forEach( function( el, idx, arr ) {
      for ( prop in el ) {
        result.content[prop] = el[prop];        
      }
    });
    console.log( result );
    return result;
  }

  $( '#mainBtn' ).click( function() {
  $.ajax( {
      type: 'GET', 
      url: '/data',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        var processedData = processData( data ),
            template = processedData.template,
            content = processedData.template( processedData.content ),
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