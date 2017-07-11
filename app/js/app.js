$(document).ready(function(){
	$.getJSON('../data/products.json', function(data){
		//log return data
		console.log(data);

		//create and append page header from JSON
		var pageHeader = $("<h1>");
		pageHeader.text(data.category);
		$(".page-header").append(pageHeader);
		
	})
});