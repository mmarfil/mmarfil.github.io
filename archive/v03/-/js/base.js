$(document).ready(function() {

	// Blog Toggle
	$('.blog-toggle').hover(
		function(){
			$('#bln-blog').fadeIn('normal');
		}, function() {
			$('#bln-blog').fadeOut('normal');
	});

	// Work Toggle
	$('.work-toggle').hover(
		function(){
			$('#bln-work').fadeIn('normal');
		}, function() {
			$('#bln-work').fadeOut('normal');
	});
	
	// Contact Toggle
	$('.contact-toggle').hover(
		function(){
			$('#bln-contact').fadeIn('normal');
		}, function() {
			$('#bln-contact').fadeOut('normal');
	});
	
});