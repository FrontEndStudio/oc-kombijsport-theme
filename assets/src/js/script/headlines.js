// headlines.js

if ( $("#js_headlines ul li").length >= 8 ) {

  $('#js_headlines ul li').hide().filter(':lt(8)').show();

  $('#js_headlines ul')
  .append('<li><span><a><i class="icon-up-open-big"></i> Bekijk meer...</a></span><span class="less"><a><i class="icon-down-open-big"></i> Bekijk minder...</a></span></li>')
  .find('li:last')
  .click(function(){
    $(this)
    .siblings(':gt(8)')
    .toggle()
    .end()
    .find('span')
    .toggle();
  });

}

//
// EOF
//
