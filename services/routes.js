
var app = module.parent.exports.app,
    moment = require( 'moment' ),
    helper = require( './helper' ),
    feed = require( './feed' );

app.get( '/templates', function( req, res ) {
  var templates =
  {
    buttons: {
        row: 1,
        pos: 1,
        col: 12,
        template: "<h2>{{buttonsWidgetHeading}}</h2>\n<div class='btn-group btn-group-justified'>\n{{#each buttonWidgetButtons}}\n<div class='btn-group'>\n<button onclick=\"window.open(\'//{{link}}\', \'_blank\');\" type='button' class='btn {{style}}'>{{#if icon}}<i class='fa {{icon}}'></i> {{/if}}{{buttonName}}</button>\n</div>\n{{/each}}\n</div>\n"
    },
    feed: {
        row: 2,
        pos: 1,
        col: 6,
        template: "<h2>{{feedWidgetHeading}}</h2>\n{{#each feedItems}}\n<div class='panel panel-default'>\n<div class='panel-heading'>{{feedTitle}}</div>\n<div class='panel-body'>\n<p>{{feedMessage}}</p>\n</div>\n<div class='panel-footer text-muted'>\n<small>{{feedDate}}</small>\n</div>\n</div>\n{{/each}}\n"
    },
    articles: {
        row: 2,
        pos: 2,
        col: 6,
        template: "<h2>{{articleWidgetHeading}}</h2>\n{{#each articleWidgetParagraph}}\n<p>{{this}}</p>\n{{/each}}\n"
    }
  }
  res.send( templates );
});

app.get( '/content', function( req, res ) {
  var feedItems = feed.responder();

  helper.getHipsterIpsum( function( hipsterIpsum ) {
      var content =
      {
        buttons:
        {
          "buttonWidgetHeading" : "Button Widget Heading",
          "buttonWidgetButtons" :
          [
            {
              "buttonName" : "Google Plus",
              "link" : "plus.google.com",
              "icon" : "fa-google-plus",
              "style" : "btn-gplus"
            },
            {
              "buttonName" : "Facebook",
              "link" : "www.facebook.com",
              "icon" : "fa-facebook",
              "style" : "btn-fb"
            },
            {
              "buttonName" : "Twitter",
              "link" : "twitter.com",
              "icon" : "fa-twitter",
              "style" : "btn-twt"
            },
            {
              "buttonName" : "Pinterest",
              "link" : "pinterest.com",
              "icon" : "fa-pinterest",
              "style" : "btn-pin"
            }
          ]
      },
      feed:
      {
        "feedWidgetHeading" : "Feed Widget Heading",
        "feedItems" : feedItems
      },
      articles:
      {
        "articleWidgetHeading" : "Article Widget Heading",
        "articleWidgetParagraph" :
        [
          hipsterIpsum[0],
          hipsterIpsum[1],
          hipsterIpsum[2],
          hipsterIpsum[3],
        ]
      }
    }
  res.send( content );
  });
});