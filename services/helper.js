
  /**
   * Helper functions and etc ...
   */

  var request = require( 'request' ),
      ent = require( 'ent' ),
      chance = require('chance').Chance();


  module.exports =
  {
    getCurrentDate: function() {
      var today = new Date(),
          day = today.getDate(),
          month = today.getMonth() + 1,
          year = today.getFullYear();

      if ( day < 10 ) {
        day = '0' + day
      }

      if ( month < 10 ) {
        month= '0' + month
      }

      today = month + '/' + day + '/' + year;
      return today;
    },
    getCurrentTime: function() {
      var now = new Date(),
          hour = now.getHours(),
          minute = now.getMinutes(),
          second = now.getSeconds(),
          time = '';

      if ( hour < 10 ) {
        hour = '0' + hour;
      }

      if ( minute < 10 ) {
        minute = '0' + minute;
      }

      if ( second < 10 ) {
        second = '0' + second;
      }

     time = hour + ':' + minute + ':' + second;
     return time;
    },
    getSemiRandomTime: function() {
      var randTime = chance.hour() + ':' + chance.minute() + ':' + chance.second();
      return randTime;
    },
    getHipsterIpsum: function( callback ) {
      var paragraphArray = [];
      request( 'http://hipsterjesus.com/api?paras=' + chance.natural( {min: 3, max: 6}) + '&type=hipster-centric',
        function( err, res, body ) {
        if( !err && res.statusCode == 200 ) {
          var paragraphs = JSON.parse( body );
          paragraphArray = paragraphs.text.split( "</p>" );
          for( i = 0; i < paragraphArray.length; i++ ) {
            paragraphArray[i] = paragraphArray[i].replace( '<p>', '' );
            paragraphArray[i] = ent.decode(paragraphArray[i]);
          }
          callback( paragraphArray );
        }
      });
    }
  }