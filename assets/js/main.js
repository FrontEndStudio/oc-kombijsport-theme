// main.js
// http://tech-blog.maddyzone.com/javascript/first-step-with-require-js
// https://www.youtube.com/watch?v=vWGuaZOTR4U

/*

define(id?, dependencies?, factory);
define([], function() {});

// id:            give our module a unique id ... 
                  (which is really just a path)
// dependencies:  list any dependencies in an Array and RequireJs ...
                  will automatically inject them into your module
// factory:       Called once per module. *If* the factory function ...
                  returns anything then that object should be assigned as ...
                  the exported value for the module           

*/

// requirejs.config({});

require.config({

  // by default load any module IDs from 'js'
  baseUrl: 'js',
  
  // here we set our js folder
  // config is relative to the baseUrl, and never includes a ".js" extension
  // the paths config should be for a directory

  paths: {
    'jquery.fancybox':            'vendor-src/jquery.fancybox',
    'jquery.fancybox-buttons':    'vendor-src/jquery.fancybox-buttons',
    'jquery':                     [
                                    '//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js',
                                    'vendor-src/jquery',
                                  ],
    'jquery.touchSwipe':          'vendor-src/jquery.touchSwipe',
    'modernizr':                  'vendor-src/modernizr',

    'jquery.cycle2.caption2':     'plugin-src/jquery.cycle2.caption',
    'jquery.cycle2.scrollVert':   'plugin-src/jquery.cycle2.scrollVert',
    'jquery.cycle2.swipe':        'plugin-src/jquery.cycle2.swipe',
    'jquery.cycle2':              'plugin-src/_jquery.cycle2',
    'owl.carousel':               'plugin-src/owl.carousel'

    // script-src

  },

  // 'highstock': ['jquery']

  shim: {

    'jquery.fancybox': {
      deps: ['jquery']
    },
    'jquery.fancybox-buttons': {
      deps: ['jquery', 'jquery.fancybox']
    },
    'jquery.touchSwipe': {
      deps: ['jquery']
    },
    'jquery.cycle2.caption2': {
      deps: ['jquery', 'jquery.cycle2']
    },
    'jquery.cycle2.scrollVert': {
      deps: ['jquery', 'jquery.cycle2']
    },
    'jquery.cycle2.swipe': {
      deps: ['jquery', 'jquery.cycle2']
    },
    'jquery.cycle2': {
      deps: ['jquery']
    },
    'owl.carousel': {
      deps: ['jquery']
    }

  },

  packages: [

  ]
});

// now we are loading jquery.fancybox but it depends on jQuery so load jquery before jquery.fancybox

//require(['jquery.fancybox'], function() {
  //alert("Load all files");
  //$('<div>jquery and jquery.fancybox loaded</div>').appendTo("body");
//});

// single_page app (index.html)
// deps: ['app/main'],

// multi_page app (index.html)


// require(['./js/config.js', function() {
  // one we've ensured that config.js has loaded we can
  // kick off our application logic.
//  require(['app']);
//});


//
// EOF
//