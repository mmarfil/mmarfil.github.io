$(document).ready(function() {

	// About Toggle
	$('.about-toggle').toggle(
		function(){
			$('#about-me').fadeIn('slow');
			$('#imgArrow').attr('src','images/about-on.png');
		}, function() {
			$('#about-me').fadeOut('slow');
			$('#imgArrow').attr('src','images/about-off.png');
	});


	// Rotating Banner
	$('#coda-slider-1').codaSlider({
		autoSlide: true,
		autoSlideInterval: 8000,
		autoSlideStopWhenClicked: true,
		dynamicArrows: false,
		dynamicTabsPosition: "bottom",
		slideEaseDuration: 1000
	});
	
});