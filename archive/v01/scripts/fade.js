(function ($) {
    $.fn.cross = function (options) {
        return this.each(function (i) { 
            var $$ = $(this);
            var target = $$.css('backgroundImage').replace(/^url|[\(\)'"]/g, '');
            $$.wrap('<span style="position: relative;"></span>')
                .parent()
                .prepend('<img>')
                .find(':first-child')
                .attr('src', target);
            if ($.browser.msie && $.browser.version < 8.0) { 
            	$$.css({
            		'position' : 'absolute', 
            		'left' : 0, 
            		'background' : '', 
            		'top': "0" 
            	}); 
            }
            else if ($.browser.mozilla) { $$.css({ 'position' : 'absolute', 'left' : 0, 'background' : '', 'top':this.offsetTop });
            } else if ($.browser.opera && $.browser.version < 9.5) {
                $$.css({
                    'position' : 'absolute', 
                    'left' : 0,
                    'background' : '',
                    'top' : "0"
                });
            } else {
                $$.css({
                    'position' : 'absolute', 
                    'left' : 0,
                    'background' : ''
                });
            }
            $$.hover(function () {
                $$.stop().animate({
                    opacity: 0
                }, 500);
            }, function () {
                $$.stop().animate({
                    opacity: 1
                }, 500);
            });
        });
    };
    
})(jQuery);
$(window).bind('load', function () {
    $('img.fade').cross();
});