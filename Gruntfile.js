module.exports = function(grunt) {

grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),

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
          'assets/css/*.css',
          'assets/js/{,**/}*.js'
        ]
      },

      // Have custom Modernizr tests? Add them here.
      'customTests': [],

      // Path to the build your're using for development
      // bower_components/modernizr/dist/modernizr-build.js
      'devFile': false,

      // Path to save out the build file
      'dest': 'assets/js/vendor/modernizr.js',

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

  // https://github.com/gruntjs/grunt-contrib-uglify
  // Minify files with UglifyJS.
  // dest : src
  uglify: {
    dist: {
      options: {
        mangle: false
      },
      files: {
        'assets/js/vendor/modernizr.js': ['assets/js/vendor/modernizr.js'],
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
        src: ['src/js/main/*.js']
      }
    }
  },

});

grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-modernizr');
grunt.loadNpmTasks('grunt-contrib-uglify');

grunt.registerTask('default', ['jshint:self']);

grunt.registerTask('js-build', [
  'jshint',
  'modernizr',
  'uglify'
]);

};

//
// EOF
//

