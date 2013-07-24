'use strict';

module.exports = function(grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var fruitConfig = {
    src: 'src',
    mockup: 'app',
    app: 'app'
  };

  // Project configuration
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    fruit: fruitConfig,
    watch: {
      stylus: {
        files: ['<%= fruit.src %>/style/{,*/}*.styl'],
        tasks: ['stylus:development'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      coffee: {
        files: ['<%= fruit.src %>/script/{,*/}*.coffee'],
        tasks: ['coffee:development'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      template: {
        files: ['<%= fruit.src %>/template/{,*/}*.hbs', '<%= fruit.src %>/template/data/data.json'],
        tasks: ['template'],
        options: {
          nospawn: true,
          livereload: true
        }
      },
      development: {
        options: {
          nospawn: true,
          livereload: true
        },
        files: [
          '<%= fruit.mockup %>/{,*/}*.html',
          '<%= fruit.mockup %>/{,*/}*.css',
          '<%= fruit.mockup %>/{,*/}*.js',
          '<%= fruit.mockup %>/{,*/}*.{png,jpg,jpeg,gif}'
        ],
        tasks: []
      }
    },
    stylus: {
      development: {
        options: {
          urlfunc: 'embedurl', // use embedurl('test.png') in our code to trigger Data URI embedding
          compress: false,
          linenos: true
        },
        files: {
          '<%= fruit.mockup %>/css/application.css': '<%= fruit.src %>/style/*.build.styl' // compile and concat into single file
        }
      },
      production: {
        options: {
          urlfunc: 'embedurl'
        },
        files: {
          '<%= fruit.mockup %>/css/application.css': '<%= fruit.src %>/style/*.build.styl'
        }
      }
    },
    coffee: {
      development: {
        options: {
          sourceMap: true,
          bare: true
        },
        files: [{
          expand: true,
          cwd: '<%= fruit.src %>/script/',
          src: ['**/*.coffee'],
          dest: '<%= fruit.mockup %>/js/',
          ext: '.js'
        }]
      },
      production: {
        options: {
          bare: true,
          join: true
        },
        files: {
          '<%= fruit.mockup %>/js/application.js': '<%= fruit.src %>/script/*.coffee' // concat then compile into single file
        }
      }
    },
    template: {
      all: {
        engine: 'handlebars',
        cwd: '<%= fruit.src %>/template/',
        partials: ['<%= fruit.src %>/template/partials/*.hbs'],
        data: '<%= fruit.src %>/template/data/data.json',
        options: {
        },
        files: [
          {
            expand: true,     // Enable dynamic expansion.
            cwd: '<%= fruit.src %>/template/',      // Src matches are relative to this path.
            src: '*.hbs', // Actual pattern(s) to match.
            dest: '<%= fruit.mockup %>/',   // Destination path prefix.
            ext: '.html'  // Dest filepaths will have this extension.
          }
        ]
      }
    },
    clean: {
      production: {
        src: ['<%= fruit.mockup %>/js/**/*.map']
      }
    },
    copy: {
      development: {
        files: [
          {'<%= fruit.mockup %>/js/vendor/require.js': '<%= fruit.src %>/components/requirejs/require.js'}
        , {'<%= fruit.mockup %>/js/vendor/jquery.js': '<%= fruit.src %>/components/jquery/jquery.js'}
        , {'<%= fruit.mockup %>/js/vendor/modernizr.js': '<%= fruit.src %>/components/modernizr/modernizr.js'}
        , {'<%= fruit.mockup %>/js/vendor/underscore.js': '<%= fruit.src %>/components/underscore/underscore.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.js': '<%= fruit.src %>/components/backbone-amd/backbone.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.marionette.js': '<%= fruit.src %>/components/marionette/lib/backbone.marionette.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.localStorage.js': '<%= fruit.src %>/components/backbone.localStorage/backbone.localStorage.js'}
        // , {expand: true, cwd: '<%= fruit.mockup %>/css/fonts/', src: '**', dest: '<%= fruit.app %>/css/fonts/', filter: 'isFile'}
        ]
      }
    , production: {
        files: [
          {'<%= fruit.mockup %>/js/vendor/require.js': '<%= fruit.src %>/components/requirejs/require.js'}
        , {'<%= fruit.mockup %>/js/vendor/jquery.js': '<%= fruit.src %>/components/jquery/jquery.min.js'}
        , {'<%= fruit.mockup %>/js/vendor/modernizr.js': '<%= fruit.src %>/components/modernizr/modernizr.js'}
        , {'<%= fruit.mockup %>/js/vendor/underscore.js': '<%= fruit.src %>/components/underscore/underscore-min.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.js': '<%= fruit.src %>/components/backbone-amd/backbone-min.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.marionette.js': '<%= fruit.src %>/components/marionette/lib/backbone.marionette.min.js'}
        , {'<%= fruit.mockup %>/js/vendor/backbone.localStorage.js': '<%= fruit.src %>/components/backbone.localStorage/backbone.localStorage-min.js'}
        // , {expand: true, cwd: '<%= fruit.mockup %>/css/fonts/', src: '**', dest: '<%= fruit.app %>/css/fonts/', filter: 'isFile'}
        ]
      }
    }
  });

  grunt.registerTask('build', [
    'stylus:production',
    'coffee:production',
    'template',
    'clean:production',
    'copy:production'
  ]);

  grunt.registerTask('server', [
    'stylus:development',
    'coffee:development',
    'copy:development',
    'watch'
  ]);

  grunt.registerTask('default', [
    'server'
  ]);

};
