
var app = module.parent.exports.app,
    helper = require( './helper' );

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

  var today = helper.getCurrentDate();
  helper.getHipsterIpsum( function( pArray ) {
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
              "style" : "btn-success"
            },
            {
              "buttonName" : "Facebook",
              "link" : "www.facebook.com",
              "icon" : "fa-facebook",
              "style" : "btn-primary"
            },
            {
              "buttonName" : "Twitter",
              "link" : "twitter.com",
              "icon" : "fa-twitter",
              "style" : "btn-info"
            },
            {
              "buttonName" : "Pinterest",
              "link" : "pinterest.com",
              "icon" : "fa-pinterest",
              "style" : "btn-warning"
            }
          ]
      },
      feed:
      {
        "feedWidgetHeading" : "Feed Widget Heading",
        "feedItems" :
        [
          {
            "feedTitle" : "Feed_Item_One",
            "feedMessage" : "Feed message one goes here...",
            "feedDate" : today
          },
          {
            "feedTitle" : "Feed_Item_Two",
            "feedMessage" : "Feed message two goes here...",
            "feedDate" : today
          },
          {
            "feedTitle" : "Feed_Item_Three",
            "feedMessage" : "Feed message three goes here...",
            "feedDate" : today
          },
          {
            "feedTitle" : "Feed_Item_Four",
            "feedMessage" : "Feed message four goes here...",
            "feedDate" : today
          },
          {
            "feedTitle" : "Feed_Item_Five",
            "feedMessage" : "Feed message five goes here...",
            "feedDate" : today
          },
        ]
      },
      articles:
      {
        "articleWidgetHeading" : "Article Widget Heading",
        "articleWidgetParagraph" :
        [
          pArray[0],
          pArray[1],
          pArray[2],
          pArray[3],
        ]
      }
    }
  res.send( content );
  });
});