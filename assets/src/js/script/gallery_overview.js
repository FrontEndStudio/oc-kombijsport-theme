// gallery_overview.js

if ($('#gallery_overview').length !== 0) {

  $('.gallery_overview').owlCarousel({
    items: 1,
    margin: 0,
    loop: true,
    stagePadding: 0,
    dots: true,
    nav: false,
    navText: ['volgende', 'vorige'],

    responsive : {
      0: {
        items: 1,
      },
      320: {
        items: 1,
      },
      480: {
        items: 2,
      },
      720: {
        items: 3,
      },
      960: {
        items: 6
      }
    },

    itemElement: 'div'

  });

}

//
// EOF
//
