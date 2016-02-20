// fancybox-buttons.js

if ($('.fancybox-buttons').length !== 0) {

  $('.fancybox-buttons').fancybox({
    width: "100%",
    margin: [0, 0, 0, 0],
    padding: [0, 0, 0, 0],
    openEffect  : 'none',
    closeEffect : 'none',
    prevEffect : 'fade',
    nextEffect : 'fade',
    closeBtn  : false,
    arrows: false,
    helpers : {
      title : null,
      overlay : {
        css : {
          'background' : 'rgba(0, 0, 0, 0.95)'
        }
      },
      buttons : {
      }

    },
    afterShow: function() {
      $('.fancybox-wrap').swipe({
        swipe : function(event, direction) {
          if (direction === 'left' || direction === 'up') {
            $.fancybox.prev( direction );
          } else {
            $.fancybox.next( direction );
          }
        }
      });

    },

    afterLoad : function() {
    }

  });

}

//
// EOF
//
