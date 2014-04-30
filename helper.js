
/**
 * Helper functions and etc ...
 */

var request = require( 'request' ),
    ent = require( 'ent' ),
    chance = require('chance').Chance();

 exports.getCurrentDate = function getCurrentDate() {
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
 }

  exports.getCurrentTime = function getCurrentTime() {
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
  }

  exports.getSemiRandomDate = function getSemiRandomDate() {
    var today = new Date(),
        day = today.getDate(),
        month = today.getMonth(),
        year = today.getFullYear();

    if ( day < 10 ) {
      if ( ( Math.random() * ( 10 - 1 ) + 1 ) > 5 && month < 12 ) {
        month = month + 1
      }
    }

    var randDate = chance.date( { string: true, month: month, year: year } );
    return randDate;
  }

  exports.getSemiRandomTime = function getSemiRandomTime () {
    var randTime = chance.hour() + ':' + chance.minute() + ':' + chance.second();
    return randTime;
  }

  exports.getHipsterIpsum = function getHipsterIpsum( callback ) {
    request( 'http://hipsterjesus.com/api?paras=4&type=hipster-centric', function( err, res, body ) {
      if( !err && res.statusCode == 200 ) {
        var paragraphs = JSON.parse( body );
        paragraphArray = paragraphs.text.split( "</p>" );
        for( i = 0; i < paragraphArray.length; i++ ) {
          paragraphArray[i] = paragraphArray[i].replace( '<p>', '' );
          paragraphArray[i] = ent.decode(paragraphArray[i]);
        }
        callback(paragraphArray);
      }
    });
  }