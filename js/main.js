
$(document).on('click', '#convert1', function() {
	var content = $("#section1").html();
	var template = Handlebars.compile(content);
	var data = {"heading1" : "This is the heading!", "paragraph1" : "This is a bunch of content."};
	var result = template(data);
	$("#section1").html(result);
	$("#btn1").hide();
});

$(document).on('click', '#convert2', function() {
	var content = $("#section2").html();
	var template = Handlebars.compile(content);
	var data = {"heading2" : "This is the second head!", "paragraph2" : "This is a bunch more content. So dynamic and so snazzy!"};
	var result = template(data);
	$("#section2").html(result);
	$("#btn2").hide();
});
