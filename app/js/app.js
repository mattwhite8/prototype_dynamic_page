$(document).ready(function(){
	$.getJSON('../data/products.json', function(data){
		//log return data
		console.log(data);

		//create and append page header from JSON
		var pageHeader = $("<h1>");
		pageHeader.text(data.category);
		$(".page-header").append(pageHeader);

		//populate the slider divs
		var products = data.products;
		for(var i = 0; i < products.length; i++){
			var img = $("<img>");
			img.attr('src', "../img/" + products[i].image);
			img.attr('data-title', products[i].title);
			img.attr('data-price', products[i].price);
			$(".slider-for").append(img.clone());
			$(".slider-nav").append(img.clone());
		}

	}).then(function(){
		//run inside of then() to ensure initialization only after json data populates
		$('.slider-for').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
		  arrows: false,
		  fade: true,
		  asNavFor: '.slider-nav'
		});
		$('.slider-nav').slick({
		  slidesToShow: 3,
		  slidesToScroll: 1,
		  asNavFor: '.slider-for',
		  dots: true,
		  centerMode: true,
		  focusOnSelect: true
		});
	});

});