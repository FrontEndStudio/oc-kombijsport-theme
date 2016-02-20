module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

  // https://github.com/gruntjs/grunt-contrib-clean
  // Clear files and folders.
  // ad.1 does not remove folders it self.
  //     'public/css/fonts/{,**/}*.{eot,svg,ttf,woff,woff2}',
  // ad.2 does not work outside current working directory

  //clean: {
  //  js: [
  //  '../js/{,**/}*.{js,map}',
  //  '../js/'
  //  ]
  //},

  // https://github.com/Modernizr/grunt-modernizr
  // Build out a lean, mean Modernizr machine.
  // https://github.com/doctyper/customizr#config-file
  modernizr: {

    dist: {

      // Avoid unnecessary builds (see Caching section below)
      // see: https://github.com/doctyper/customizr#caching
      // "cache" : true,

      // By default, this task will crawl your project for references to Modernizr tests.
      // Set to false to disable.
      'parseFiles': true,

      // Set to true to pass in buffers via the "files" parameter below
      //'useBuffers' : false,

      // When parseFiles = true, this task will crawl all *.js, *.css, *.scss files, except files that are in node_modules/.
      // You can override this by defining a "files" array below.

      // Specify files to scan fro references to Modernizr (all .js and .css files)
      files: {
        src: [
          '../css/*.css',
          'js/{,**/}*.js'
        ]
      },

      // Have custom Modernizr tests? Add them here.
      'customTests': [],

      // Path to the build your're using for development
      // bower_components/modernizr/dist/modernizr-build.js
      'devFile': false,

      // Path to save out the build file
      'dest': 'js/vendor/modernizr.js',

      // By default, source is uglified before saving
      'uglify': false,

      'options': [
        'setClasses',
        'addTest',
        'html5printshiv',
        'testProp',
        'fnBind'
      ],

      // A string that is added before each CSS class.
      // default: ""
      //'classPrefix': 'xxx', // <-- does not work in grunt-modernizr

      // Wheter or not to update .no-js to .js on the root element
      // default: true
      //'enableJSClass': false, // <-- does not work in grunt-modernizr

      // Wheter or not Modernizer should add its CSS classes at all
      // default: true
      //'enableClasses': false, // <-- does not work in grunt-modernizr

      'extensibility': [
      ],

      //
      'matchCommunityTests': true,

      // Define any test you want to explicitly include
      'tests': [
        'mediaqueries'
      ],

      // Useful for excluding any tests that this tool will match
      // e.g. you use .notification class for notification elements,
      // but don’t want the test for Notification API
      'excludeTests': [
      ]

      // By default, will crawl your project for references to Modernizr tests
      // Set to false to disable
      //"crawl" : true,

    }

  },

  // https://github.com/gruntjs/grunt-contrib-concat
  // Concatenate files
  concat: {
    options: {
      banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %> */',
    },
    main: {
      options: {
        sourceMap: true,
        sourceMapName: '../js/main.map'
      },
      files: {
        '../js/main.js': ['js/main/*.js']
      }
    },
    plugins: {
      options: {
        sourceMap: true,
        sourceMapName: '../js/plugins.map'
      },
      files: {
        '../js/plugins.js': ['js/plugins/*.js']
      }
    }
  },

  // https://github.com/gruntjs/grunt-contrib-uglify
  // Minify files with UglifyJS.
  // dest : src
  uglify: {
    dist: {
      options: {
        mangle: false
      },
      files: {
        '../js/plugins.js': ['js/plugins.js'],
        '../js/main.js': ['js/main.js'],
        '../js/vendor/jquery.js': ['js/vendor/jquery.js'],
        '../js/vendor/jquery.fancybox.js': ['js/vendor/jquery.fancybox.js'],
        '../js/vendor/jquery.fancybox-buttons.js': ['js/vendor/jquery.fancybox-buttons.js'],
        '../js/vendor/jquery.js': ['js/vendor/jquery.js'],
        '../js/vendor/jquery.touchSwipe.js': ['js/vendor/jquery.touchSwipe.js'],
        '../js/vendor/modernizr.js': ['js/vendor/modernizr.js'],
      }
    }
  },

  // https://github.com/gruntjs/grunt-contrib-jshint
  // Validate files with JSHint
  jshint: {
    options: {
      globals: {
        jQuery: true,
        console: true,
        module: true
      }
    },
    self: {
      files: {
        src: ['Gruntfile.js', 'gulpfile.js']
      }
    },
    src: {
      files: {
        src: ['js/main/*.js']
      }
    }
  },

  // https://github.com/gruntjs/grunt-contrib-copy
  // Copy files and folders
  copy: {
    js_vendor: {
      cwd: 'js/vendor',
      src: ['**/*.js'],
      dest: '../js/vendor',
      expand: true
    }
  },

  // https://github.com/gruntjs/grunt-contrib-watch
  // Run tasks whenever watched files change.
  watch: {
    options: {
      livereload: false
    },
    js: {
      files: ['js/{,**/}*.js', '!js/{,**/}*.min.js'],
      tasks: ['jshint:src', 'concat:main'],
      options: {
        spawn: false
      }
    }
  }

});

grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-modernizr');

grunt.registerTask('default', ['jshint:self']);

grunt.registerTask('js-dev', [
  'jshint:src',
  'modernizr',
  'concat',
  'copy:js_vendor'
]);

grunt.registerTask('js-build', [
  'js-dev',
  'uglify'
]);

};

//
// EOF
//

