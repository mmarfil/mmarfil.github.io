jQuery.fn.outerHTML = function() {
    return $('<div>').append(this.eq(0).clone()).html();
};

// Function to center an element horizontally
// Inspired by http://bit.ly/9gRSUK
jQuery.fn.hcenter = function() {
this.css("left", ($(this).parent().width() - $(this).outerWidth()) / 2 +'px');
return this;
}

$(document).ready(function() {
    $('#portfolio').after('<ul id="nav">').cycle({
        fx:     'fade',
        speed:  'medium',
        timeout: 0,
        pager:  '#nav',
        pagerAnchorBuilder: function(idx, slide) {
            return '<li><a href="#"><img src="' + $(slide).find('img').attr('src').split('.').reverse().slice(1).reverse().join('.') + '-sm.png" width="50" height="50" /></a></li>';
        }
    });  
      
      $('#portfolio .item').live('mouseover mouseout', function(event){
     	 if (event.type == 'mouseover') {
     		 $(this).find('.item-info').hcenter().stop().fadeTo(200, 0.75);
     	 } else {
     		 $(this).find('.item-info').stop().fadeTo(200, 0);
      	}
      });

    $("header #logo a").hover(
        function() { // mouseover
            $("header .logo-popup").show();
            $("header .logo-popup").animate({ top:"-30px" }, 300);
        }, 
        function() { // mouseout 
            $("header .logo-popup").animate({ top:"-4px" }, 300);
            setTimeout("$('header .logo-popup').hide();",   300);
            $("header .logo-popup").animate({ top:"-4px" }, 300);
        }
    );

});
