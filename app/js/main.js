$(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		prevArrow: '<button type="button" class="slick-prev"><img src="../images/arrow-left.png"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="../images/arrow-right.png"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					arrows: false,
					dots: true
				}
			}
		]
	});

});