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

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab-active)', function () {
		$(this)
			.addClass('catalog__tab-active').siblings().removeClass('catalog__tab-active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content-active').eq($(this).index()).addClass('catalog__content-active');
	});


	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content-active');
				$('.catalog-item__info').eq(i).toggleClass('catalog-item__info-active');
			});
		});
	}

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn();
	});

	$('.modal__close').on('click', function () {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});

	$('.button-mini').each(function (i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn();
		});
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
					required: true,
					minlength: 2
				},
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: {
					required: "Пожалуйста, введите своё имя",
					minlength: jQuery.validator.format("Введите как минимум {0} символа!")
				},
				phone: "Пожалуйста, введите свой телефон",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введён адресс почты"
				}
			}
		});
	}

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+ 7 (999) 999-99-99");

	$('form').submit(function (e) {
		e.preventDefault()

		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function () {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');

			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup

	$(window).scroll(function () {
		if ($(this).scrollTop() > 500) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();

		}
	})

	$("a[href='#up']").click(function () {
		const _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	})

	new WOW({
		offset: 300
	}).init();
});