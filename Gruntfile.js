/*!
 * petal - Gruntfile
 * http://shakrmedia.github.io/petal
 * Copyright 2015 Shakr Media Co., Ltd.
 */

module.exports = function(grunt) {
  'use strict';
  
  require("load-grunt-tasks")(grunt, {
    pattern: ['grunt-*', 'assemble']
  });
  
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Meta
    meta: {
      banner: '/* \n' +
              ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
              ' * <%= pkg.description %> \n' +
              ' * <%= pkg.homepage %> \n' +
              ' * \n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> License \n' +
              ' */\n'
    },

    // LESS
    less: {
      petal: {
        expand: true,
        cwd: "less",
        src: ["petal.less"],
        ext: ".css",
        dest: "build"
      },
      docs: {
        expand: true,
        cwd: "site-src/less",
        src: ["docs.less"],
        ext: ".css",
        dest: "_gh-pages/assets"
      },
      dist: {
        options: {
          modifyVars: {
            "petalicon-file-path": "'.'"
          }
        },
        files: [{
          expand: true,
          cwd: "less",
          src: ["petal.less"],
          ext: ".css",
          dest: "_dist"
        }]
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
        browser: ["last 3 versions", "ie 10"],
        remove: false
      },
      petal: {
        expand: true,
        cwd: "build",
        src: ["petal.css"],
        dest: "build"
      },
      docs: {
        expand: true,
        cwd: "_gh-pages/assets",
        src: ["docs.css"],
        dest: "_gh-pages/assets"
      },
      dist: {
        expand: true,
        cwd: "_dist",
        src: ["petal.css"],
        dest: "_dist"
      }
    },

    // css minify
    cssmin: {
      petal: {
        src: "build/petal.css",
        dest: "build/petal.min.css"
      },
      dist: {
        src: "_dist/petal.css",
        dest: "_dist/petal.min.css"
      }
    },
    
    // uglify
    uglify: {
      options: {
        mangle: false
      },
      petal: {
    		src: ['js/*.js'],
    		dest: 'build/<%= pkg.codename %>.min.js'
  	  },
      dist: {
        src: ['js/*.js'],
        dest: '_dist/<%= pkg.codename %>.min.js'
      }
    },
    
    // concat
    concat: {
      petal: {
  	    files: {
  		  'build/<%= pkg.codename %>.js':'js/*.js'
  	    }
  	  },
      dist: {
        files: {
        '_dist/<%= pkg.codename %>.js':'dist/*.js'
        }
      }
    },

    copy: {
      docs_assets: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['**/*.png','**/*.jpg','**/*.svg','**/*.woff','**/*.ttf','**/*.eot'],
          dest: '_gh-pages/assets'
        }]
      },
      docs_js: {
        files: [{
          expand: true,
          cwd: 'build',
          src: ['**/*.js'],
          dest: '_gh-pages/assets'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['petalicon.*'],
          dest: '_dist'
        }]
      }
    },

    // assemble
    assemble: {
  	  options: {
        flatten: true,
        assets: '_gh-pages/assets',
        partials: 'site-src/contents/**/*.hbs',
        layoutdir: 'site-src/contents/layouts',
        layout: 'default-layout.hbs',
        data: 'package.json'
      },

      landing: {
        files: [{
          expand: true,
          cwd: 'site-src/contents/pages/',
          src: ['index.hbs'],
          dest: '_gh-pages',
          ext: '.html'
        }]
      },

      start: {
        options: {
          layout: 'docs-layout.hbs'
        },
        files: [{
          expand: true,
          cwd: 'site-src/contents/pages/start',
          src: ['*.hbs'],
          dest: '_gh-pages/start',
          ext: '.html'
        }]
      },

      docs: {
        options: {
          layout: 'docs-layout.hbs'
        },
        files: [{
          expand: true,
          cwd: 'site-src/contents/pages/docs',
          src: ['*.hbs'],
          dest: '_gh-pages/docs',
          ext: '.html'
        }]
      }
      
    },

    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= meta.banner %>'
      },
      petal: {
        src: [
            "build/<%= pkg.codename %>.css",
            "build/<%= pkg.codename %>.min.css",
          ]
      },
      dist: {
        src: [
            "_dist/<%= pkg.codename %>.css",
            "_dist/<%= pkg.codename %>.min.css",
          ]
      }
    },

    // start webserver
    connect: {
      main: {
        options: {
          port: 9000,
          base: '_gh-pages/',
          livereload: 9001
        }
      }
    },

    // watch
    watch: {
      options: {
        livereload: 9001
      },
      main: {
        files: ['less/**/*', 'site-src/contents/**/*', 'site-src/less/*', 'js/*'],
        tasks: ['default']
      }
    }
  });
  
  grunt.registerTask('default', [
    'less:petal', 'less:docs', 
    'autoprefixer:petal', 'autoprefixer:docs',
    'cssmin:petal', 
    'uglify:petal', 'concat:petal', 'usebanner:petal', 
    'copy:docs_assets', 'copy:docs_js', 
    'assemble']);
  grunt.registerTask('petal', ['less:petal', 'autoprefixer:petal', 'cssmin:petal', 'uglify:petal', 'concat:petal', 'usebanner:petal']);
  grunt.registerTask('petal-dist', ['less:dist', 'autoprefixer:dist', 'cssmin:dist', 'uglify:dist', 'concat:dist', 'usebanner:dist', 'copy:dist']);
  grunt.registerTask('js', ['uglify:petal', 'concat:petal']);
  grunt.registerTask('dev', ['connect', 'watch']);
  
}