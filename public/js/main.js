$( function() {

	var $welcomeHeader = $( '#welcomeHeader' ),
			$welcomeMessage = $( '#welcomeMessage' ),
			$mainBtn = $( '#mainBtn' ),
			$toggleBtn = $( '#toggleBtn'),
			$clearBtn = $( '#clearBtn' ),
      $widgetContainer = $( '#widgetContainer' ),
      $examples = $( '#examples' );

	$( document ).ready( function() {
		if ( window.localStorage.data ) {
			var oldData = JSON.parse( window.localStorage.data ),
					template = Handlebars.compile( oldData.template ),
					content = template( oldData.content );

			$welcomeHeader.html( 'Welcome Back!' );
			$welcomeMessage.html( 'Since you\'ve been here before, we\'ve processed your stored data and re-displayed it. You can use the Ready button to get new data, and if you refresh the page you should see it persist. You can hit the Toggle Examples Button to toggle between the syntax container that was removed and the content that was rendered. You can also hit the Clear Local Storage button to reset the Local Storage and refresh the page back to the original state.' );
			$toggleBtn.show();
			$clearBtn.show();
			$mainBtn.html( 'Again?' );
      $widgetContainer.fadeIn( function() {
        $widgetContainer.html( content );
        $examples.hide();
      });
		}
	});
  
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
    result.template = template;
    result.content = {};
    contentArray.forEach( function( el, idx, arr ) {
      for ( prop in el ) {
        result.content[prop] = el[prop];        
      }
    });
    console.log( result );
    return result;
  }

  $mainBtn.click( function() {
  $.ajax( {
      type: 'GET', 
      url: '/data',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        var processedData = processData( data ),
        		template = Handlebars.compile( processedData.template ),
            content = template( processedData.content );

        window.localStorage.setItem( 'data', JSON.stringify( processedData ) );

        $mainBtn.fadeOut( function() {
          $mainBtn.removeClass( 'btn-primary' ).addClass( 'btn-success' ).html( 'Success!' ).fadeIn( function() {
          	$toggleBtn.fadeIn();
            setTimeout( function(){
              $mainBtn.removeClass( 'btn-success' ).addClass( 'btn-primary' ).html( 'Again?' );
            }, 2000 );
          });
        });
        $widgetContainer.fadeIn( function() {
          $widgetContainer.html( content );
          $examples.hide();
        });
        $welcomeHeader.html( 'Success!!' );
        $welcomeMessage.html( 'There\'s a new button now, Toggle Examples, which will allow you to do exactly that that. Which is pretty cool if you want to see what was rendered. Also, if you refresh the page, you should see the content here be re-displayed automagically. It\'s not voodoo, probably. To get new data, just hit the Again? button. Be aware that this only refreshes the \'Article Widget\' today.' );
      },
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

	$toggleBtn.click( function() {
	  $examples.toggle();
    $widgetContainer.toggle();
	});

	$clearBtn.click( function() {
		window.localStorage.clear();
		window.location.reload();
	});
});