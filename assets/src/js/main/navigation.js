// navigation.js

$('#js_navigation_toggle').click(function () {

  $('#js_navigation').toggleClass('is_active');

  var target = $('#js_navigation_toggle > i');
  
  if ( $(target).hasClass('icon-layout') ) {
    target.removeClass('icon-layout').addClass('icon-menu');
  } else {
    target.removeClass('icon-menu').addClass('icon-layout');
  }

});

$('#js_navigation ul li ul').each(function() {
  $(this).before('<span class=\"arrow\"></span>');
});

$('#js_navigation ul li').click(function() {
  $(this).children('ul').toggleClass('is_active');
  $(this).children('.arrow').toggleClass('rotate');
});

//
// EOF
//
