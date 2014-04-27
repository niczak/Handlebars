
/**
 * Helper functions and etc ...
 */

var request = require('request'),
	ent 	= require('ent');

 exports.getCurrentDate = function getCurrentDate() {
	var today = new Date();
	var day = today.getDate();
	var month = today.getMonth() + 1; 
	var year = today.getFullYear();

	if(day<10) {
	    day = '0' + day
	} 

	if(month<10) {
	    month= '0' + month
	} 

	today = month + '/' + day + '/' + year;
	return today; 	
 }

 exports.getHipsterIpsum = function getHipsterIpsum(callback) {
 	request('http://hipsterjesus.com/api?paras=4&type=hipster-centric', function(err, res, body) {
 		if(!err && res.statusCode == 200) {
 			var paragraphs = JSON.parse(body);
 			paragraphArray = paragraphs.text.split("</p>");
 			for(i = 0; i < paragraphArray.length; i++) {
 				paragraphArray[i] = paragraphArray[i].replace('<p>', '');
 				paragraphArray[i] = ent.decode(paragraphArray[i]);
 			}
 			callback(paragraphArray);
 		}
 	});
 }