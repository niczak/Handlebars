$( function() {

  /**
   * cache jquery selectors. $var = jquery( '?var' ). it's performant!
   **/

  var $welcomeHeader = $( '#welcomeHeader' ),
      $welcomeMessage = $( '#welcomeMessage' ),
      $mainBtn = $( '#mainBtn' ),
      $toggleBtn = $( '#toggleBtn'),
      $clearBtn = $( '#clearBtn' ),
      $widgetContainer = $( '#widgetContainer' ),
      $examples = $( '#examples' );

  /**
   * @desc processes the template object returned by the server
   * @param object $templates - the template object containing each template
   * @return string - $template - string that will be processed by handlebars
   **/

  function processTemplates( templates ) {
    var template = '',
        templateArray = [],
        currentRow = 0,
        lastRow = 0;

    for ( widget in templates ) { // widget is the name of each widget
      for ( property in templates[widget] ) { // property element of the widget
        switch ( property ) { // work through each property, should be in order needed
          case 'row' :
            lastRow = currentRow; // starts at 0 and then increments as needed.
            if ( currentRow < templates[widget][property] ) {
              if ( lastRow !== 0 ) { // if new row and not first encountered, close div
                templateArray.push('</div>');
              }
              currentRow = templates[widget][property]; // increment
              templateArray.push( '<div class="row">' ) // new row
            }
            break;
          case 'pos' : // pos indicates the current position on the row increment starting at 1.
            // We're not doing anything with this... yet?
            break;
          case 'col' : // col indicates the number of columns in the grid of the current row.
            templateArray.push( '<div class="col-md-' + templates[widget][property] + '">' );
            break;
          case 'template' :  // this is the raw template string that is wrapped in the other code.
            templateArray.push( templates[widget][property] );
            break;
          default : // please, for the love of ... don't fall into this... it would be bad.
            break; // unless engineered to do so. then it's fine.
        }
      }
      templateArray.push( '</div>' ); // now let's close up one block.
    }
    templateArray.push( '</div>' ); // now let's wrap the rest of this thing up nice and tidy.
    template = templateArray.join( '\n' ); // turn the array into a concatenated string.
    return template; // spit it out.
  }


  /**
   * @desc processes the content object returned by the server
   * @param object $content - the content object all data
   * @return array of objects - $returnArray - array that will be merged
   * with template by handlebars.
   **/

  function processContent( content ) {

    var temporaryArray = [],
        returnArray = [];

    for ( widget in content ) { // each widget is processed from object.
        temporaryArray.push( content[widget] ); // just push it into the array blindly
    }

    temporaryArray.forEach( function( el, idx, arr ) {
      for ( prop in el ) {
        returnArray[prop] = el[prop]; //shift it all into array, handlebars don't care.
        // that is, if ALL of your variables in your template are unique, then handle-
        // bars will not care. HOWEVER, if you're dealing with possible overlapping
        // variable names, then don't bother with this. You will need to use handle-
        // bars {{#each}} or similar to get scope.
      }
    });

    return returnArray;
  }


  /**
   * check for templates, if we don't have them yet, get them and store them.
   * this is a remarkably important call to make and should be handled in a
   * better way instead of relying on a blind if statement.
   **/
  if ( !window.localStorage.templates ) {
    $.ajax({
      type: 'GET',
      url: '/templates',
      success: function( data, status, request ) {
        console.log( 'Ajax Success: ' + status );
        window.localStorage.setItem( 'templates', JSON.stringify( data ));
      },
      error: function( request, status ) {
        console.log( 'Ajax error: ' + status);
      }
    }, 'json');
  }

  /**
   * check to see if we have both content and templates stored in local storage
   * if we do, then we're going to display that content and update the page to
   * let the user know what's happened as well as change the interface for them.
   **/

  if ( window.localStorage.content  && window.localStorage.templates ) {

    var template = Handlebars.compile( processTemplates( JSON.parse( window.localStorage.templates ) ) ),
        html = template( processContent( JSON.parse( window.localStorage.content )));

    $welcomeHeader.html( 'Welcome Back!' );
    $welcomeMessage.html( 'Since you\'ve been here before, we\'ve processed your stored data and re-displayed it. You can use the Ready button to get new data, and if you refresh the page you should see it persist. You can hit the Toggle Examples Button to toggle between the syntax container that was removed and the content that was rendered. You can also hit the Clear Local Storage button to reset the Local Storage and refresh the page back to the original state.' );
    $toggleBtn.show();
    $clearBtn.show();
    $mainBtn.html( 'Again?' );
    $widgetContainer.fadeIn( function() {
      $widgetContainer.html( html );
      $examples.hide();
    });
  }

  /**
   * set a click listener on the main button that will get the current content
   * from the server. then update the page to reflect new content. some of this
   * will be abstracted out in the future to accomodate the autoupdating and
   * use of sockets / long-polling.
   **/

  $mainBtn.click( function() {
    $.ajax( {
      type: 'GET',
      url: '/content',
      success: function( data, status, request ) {
        console.log( 'ajax success:', data );

        var template = Handlebars.compile( processTemplates( JSON.parse( window.localStorage.templates ) ) ),
            html = template( processContent( data ) ); // we are relying heavily on our logic working...
            // if it turns out that we've screwed up and don't have templates, then this will fail horribly.

        window.localStorage.setItem( 'content', JSON.stringify( data ) );

        $mainBtn.fadeOut( function() {
          $mainBtn.removeClass( 'btn-primary' ).addClass( 'btn-success' ).html( 'Success!' ).fadeIn( function() {
            $toggleBtn.fadeIn();
            setTimeout( function(){
              $mainBtn.removeClass( 'btn-success' ).addClass( 'btn-primary' ).html( 'Again?' );
            }, 2000 );
          });
        });
        $widgetContainer.fadeIn( function() {
          $widgetContainer.html( html );
          $examples.hide();
        });
        $welcomeHeader.html( 'Success!!' );
        $welcomeMessage.html( 'There\'s a new button now, Toggle Examples, which will allow you to do exactly that that. Which is pretty cool if you want to see what was rendered. Also, if you refresh the page, you should see the content here be re-displayed automagically. It\'s not voodoo, probably. To get new data, just hit the Again? button. Be aware that this only refreshes the \'Article Widget\' today.' );
      },
      error: function( request, status ) { // this is done tongue in cheek...we really don't need to use handlebars to compile the error message.
        console.log( 'ajax error:', status ); // it's pretty funny, though.
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

  /**
   * yo dawg, i heard you liked listening for clicks. one of these toggles the
   * display of examples and the returned content so the user can see what they
   * are dealing with. the other clears the user's local storage so that they
   * can have a clean slate.
   **/

  $toggleBtn.click( function() {
    $examples.toggle();
    $widgetContainer.toggle();
  });

  $clearBtn.click( function() {
    window.localStorage.clear();
    window.location.reload();
  });
}); // it's all over here, the anonymous jquery function has served its purpose. move along.