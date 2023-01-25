/*! jQuery cycle plugin config for works slideshow */

$("document").ready(function() {
    $(".works").cycle({
         fx: 'scrollHorz',
         pager: '#slideshow-pager',
         activePagerClass: 'active-slide', 
         prev: '#slideshow-control-prev', 
         next: '#slideshow-control-next',
         speed: 300,
         timeout: 0,
         before: function beforePagination() {
             $('#slideshow-caption').fadeTo('fast', 0);
         },
         after: function afterPagination() {
             var title = $(this).find('img').attr('title');
             var subtitle = $(this).find('img').attr('alt')
             var productLink = $(this).find('a.product-link')[0];
             var featuredLink = $(this).find('a.featured-link')[0];
             
             $(productLink).show();
             $(featuredLink).show();
             
             var caption = '';
             caption += '<div class="links">';
             caption += productLink ? $(productLink).outerHTML() : '';
             caption += featuredLink ? $(featuredLink).outerHTML() : '';
             caption += '</div>';
             caption += title ? '<h3>' + title + '</h3>' : '';
             caption += subtitle ? '<h4>' + subtitle + '</h4>' : '';
             
             $('#slideshow-caption').html(caption);
             $('#slideshow-caption').fadeTo('fast', 1);
             
             $(productLink).hide();
             $(featuredLink).hide();
         },
         pagerAnchorBuilder: function(index, slide) { 
             return '<a href="#'+slide.id+'">'+index+'</a>'; 
         } 
     }); 
});