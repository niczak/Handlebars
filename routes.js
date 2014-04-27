
var app = module.parent.exports.app,
    helper = require( './helper' );

app.get( '/data', function( req, res ) {

  var today = helper.getCurrentDate();
  helper.getHipsterIpsum( function( pArray ) {
  var data = 
    { 
      buttons: 
      {
        row: 1,
        pos: 1,
        col: 12,
        template: "<h2>{{buttonsWidgetHeading}}</h2>\n<div class='btn-group btn-group-justified'>\n{{#each buttonWidgetButtons}}\n<div class='btn-group'>\n<button onclick=\"window.open(\'//{{link}}\', \'_blank\');\" type='button' class='btn {{style}}'>{{#if icon}}<i class='fa {{icon}}'></i> {{/if}}{{buttonName}}</button>\n</div>\n{{/each}}\n</div>\n",
        content : 
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
          }
      },
      feed:
      {
        row: 2,
        pos: 1,
        col: 6,
        template: "<h2>{{feedWidgetHeading}}</h2>\n{{#each feedItems}}\n<div class='panel panel-default'>\n<div class='panel-heading'>{{feedTitle}}</div>\n<div class='panel-body'>\n<p>{{feedMessage}}</p>\n</div>\n<div class='panel-footer text-muted'>\n<small>{{feedDate}}</small>\n</div>\n</div>\n{{/each}}\n",
        content: 
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
          }
      },
      article: 
      {
        row: 2,
        pos: 2,
        col: 6,
        template: "<h2>{{articleWidgetHeading}}</h2>\n{{#each articleWidgetParagraph}}\n<p>{{this}}</p>\n{{/each}}\n",
        content: 
          { 
            "articleWidgetHeading" : "Article Widget Heading", 
            "articleWidgetParagraph" : 
              [
                pArray[0],
                pArray[1],
                pArray[2],
                pArray[3],
                //"Helvetica 90's post-ironic disrupt fingerstache messenger bag. Godard 90's paleo Thundercats, single-origin coffee artisan gluten-free PBR&B narwhal ennui Truffaut meh. Pinterest squid bespoke pork belly. Viral retro narwhal YOLO banjo, kogi occupy biodiesel cred literally whatever mumblecore chillwave. Sriracha plaid polaroid Cosby sweater blog slow-carb. Marfa American Apparel meh Brooklyn cray umami whatever chia salvia, gluten-free hella Helvetica Vice hashtag. Hashtag Neutra pickled pour-over.",
                //"Sustainable slow-carb skateboard selvage Shoreditch, cardigan scenester Wes Anderson Brooklyn. Roof party tousled cliche Cosby sweater, XOXO Pinterest church-key Thundercats letterpress before they sold out gluten-free chillwave photo booth +1. Messenger bag Brooklyn XOXO 8-bit, pour-over kale chips artisan mumblecore fap salvia Pinterest put a bird on it Etsy pop-up. Cliche church-key before they sold out fingerstache Thundercats, viral retro Wes Anderson put a bird on it XOXO letterpress. Selvage flexitarian umami mlkshk, quinoa raw denim narwhal pickled. Umami photo booth banh mi you probably haven't heard of them, brunch gentrify direct trade pickled fixie synth church-key. Narwhal Tonx PBR&B seitan readymade, Neutra chillwave Schlitz lo-fi hashtag gentrify McSweeney's deep v trust fund.",
                //"DIY wolf four loko, Carles actually Marfa church-key selvage. Pork belly tousled hashtag kitsch. Pug sustainable Banksy small batch. You probably haven't heard of them ennui plaid slow-carb. Ethnic mlkshk tattooed, sustainable lo-fi single-origin coffee artisan seitan Neutra. 90's 3 wolf moon Carles, Vice before they sold out Odd Future tote bag chia Tonx Neutra put a bird on it. Sriracha food truck dreamcatcher artisan butcher.",
                //"Actually twee Cosby sweater Truffaut, organic McSweeney's forage tofu stumptown brunch. Bitters DIY hoodie, tousled PBR&B PBR Brooklyn quinoa 90's banh mi Odd Future disrupt flannel. Etsy mlkshk fashion axe, kitsch American Apparel cornhole normcore hashtag PBR Truffaut. Truffaut blog Blue Bottle, forage ugh swag polaroid hoodie kale chips raw denim cornhole cred fashion axe occupy. Tote bag literally yr organic, Williamsburg kitsch whatever direct trade single-origin coffee iPhone gentrify bespoke post-ironic. Wayfarers church-key art party, kogi artisan Vice occupy Wes Anderson Cosby sweater drinking vinegar Portland literally High Life selvage. Thundercats aesthetic lo-fi, Schlitz keytar master cleanse Blue Bottle craft beer." 
              ]
          }
      }
    }
  res.send( data );
  });
});