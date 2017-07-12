/* eslint-disable no-alert, no-console */

$(document).ready(function(){
	var shoppingTotal = parseFloat(0.00);
	var currentImg; //where we store the current item shown

	function buyMe(selection){
		if(selection.attr("data-cart") === "no"){
			selection.attr("data-cart", "yes");
			$(".buy").text("Remove Item");
			$(".buy").removeClass("buy-green").addClass("buy-black");
			shoppingTotal += parseFloat(selection.attr("data-price"));
			$(".shopping-total").text("$" + parseFloat(shoppingTotal).toFixed(2));
		}else{
			selection.attr("data-cart", "no");
			$(".buy").text("Add to Cart");
			$(".buy").removeClass("buy-black").addClass("buy-green");
			shoppingTotal -= parseFloat(selection.attr("data-price"));
			$(".shopping-total").text("$" + parseFloat(shoppingTotal).toFixed(2));
		}
	}

	//set initial shopping cart value
	$(".shopping-total").text("$" + parseFloat(shoppingTotal).toFixed(2));

	$.getJSON("../data/products.json", function(data){
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
			img.attr("src", "../img/" + products[i].image);
			img.attr("data-title", products[i].title);
			img.attr("data-price", products[i].price);
			img.attr("data-cart", "no");
			$(".slider-for").append(img.clone());
			$(".slider-nav").append(img.clone());
		}

	}).then(function(){
		//run inside of then() to ensure initialization only after json data populates
		$(".slider-for").slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			asNavFor: ".slider-nav"
		});
		$(".slider-nav").slick({
			slidesToShow: 3,
			slidesToScroll: 1,
			asNavFor: ".slider-for",
			dots: true,
			centerMode: true,
			focusOnSelect: true
		});
	});

	$(".slider-for").on("init", function(){
		//on init, grab title and price of first slide
		var title = $("[data-slick-index='0']").attr("data-title");
		var price = $("[data-slick-index='0']").attr("data-price");
		currentImg = $("[data-slick-index='0']");

		$(".product-title").text(title);
		$(".price").text("$" + price);

		if($("[data-slick-index='0']").attr("data-cart") === "no"){
			$(".buy").text("Add to Cart");
		}else {
			$(".buy").text("Remove Item");
		}
	});

	$(".slider-for").on("beforeChange", function(event, slick, currentSlide, nextSlide){
		//before slide change, grab info for next slide
		var title = $(slick.$slides.get(nextSlide)).attr("data-title");
		var price = $(slick.$slides.get(nextSlide)).attr("data-price");
		currentImg = $(slick.$slides.get(nextSlide));
		
		$(".product-title").text(title);
		$(".price").text("$" + parseFloat(price).toFixed(2));

		if($(slick.$slides.get(nextSlide)).attr("data-cart") === "no"){
			$(".buy").text("Add to Cart");
		}else {
			$(".buy").text("Remove Item");
		}
	});

	$(".buy").on("click", function(event){
		event.preventDefault();
		buyMe(currentImg);
	});
});