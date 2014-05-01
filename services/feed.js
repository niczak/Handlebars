
var moment = require( 'moment' ),
    chance = require('chance').Chance(),
    helper = require('./helper'),
    feedTimer;


module.exports =
{
  buildFeedItem: function( callback ) {
    var feedItem = {},
        feedTitle,
        feedMessage,
        feedDate;

    feedTitle = chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } );
    feedMessage = chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } );
    feedDate = moment().format( "MM/DD/YYYY @ hh:mm:ss" );

    feedItem =
    {
      "feedTitle" : feedTitle,
      "feedMessage" : feedMessage,
      "feedDate" : feedDate
    };
    module.exports.generator();
    module.exports.feed.unshift( feedItem );
    if ( module.exports.feed.length >= 21 ) {
      module.exports.feed.pop();
    }
    console.log( module.exports.feed.length );
  },
  generator: function() {
    feedTimer = setTimeout( this.buildFeedItem, chance.natural( {min: 10000, max: 30000 } ) );
  },
  responder: function() {
    var shortFeed = this.feed.slice( 0, 4 );

    this.generator();
    return shortFeed;
  },
  feed:
  [
    {
      "feedTitle" : chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } ),
      "feedMessage" : chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } ),
      "feedDate" :  moment().format( 'MM/DD/YYYY' ) + ' @ ' + helper.getSemiRandomTime()
    },
    {
      "feedTitle" : chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } ),
      "feedMessage" : chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } ),
      "feedDate" : moment().subtract( 'days', 1 ).format( 'MM/DD/YYYY' ) + ' @ ' + helper.getSemiRandomTime()
    },
    {
      "feedTitle" : chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } ),
      "feedMessage" : chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } ),
      "feedDate" : moment().subtract( 'days', 2 ).format( 'MM/DD/YYYY' ) + ' @ ' + helper.getSemiRandomTime()
    },
    {
      "feedTitle" : chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } ),
      "feedMessage" : chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } ),
      "feedDate" : moment().subtract( 'days', 3 ).format( 'MM/DD/YYYY' ) + ' @ ' + helper.getSemiRandomTime()
    },
    {
      "feedTitle" : chance.sentence( { words: (chance.natural( { min: 3, max: 5 } )) } ),
      "feedMessage" : chance.sentence( { words: (chance.natural( { min: 10, max: 20 } )) } ),
      "feedDate" : moment().subtract( 'days', 4 ).format( 'MM/DD/YYYY' ) + ' @ ' + helper.getSemiRandomTime()
    },
  ]
}