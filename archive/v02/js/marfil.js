jQuery.fn.outerHTML = function() {
    return $('<div>').append(this.eq(0).clone()).html();
};


$("document").ready(function() {

    $("header .logo a").hover(
        function() { // mouseover
            $("header div.logo-popup").show();
            $("header div.logo-popup").animate({ top:"-30px" }, 300);
        }, 
        function() { // mouseout 
            $("header div.logo-popup").animate({ top:"-4px" }, 300);
            setTimeout("$('header div.logo-popup').hide();",   300);
            $("header div.logo-popup").animate({ top:"-4px" }, 300);
        }
    );

});