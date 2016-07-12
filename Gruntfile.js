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
        dest: "_gh-pages"
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
        cwd: "_gh-pages",
        src: ["docs.less"],
        dest: "_gh-pages"
      }
    },

    // css minify
    cssmin: {
      minify: {
        src: "build/petal.css",
        dest: "build/petal.min.css"
      }
    },


    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= meta.banner %>'
      },
      files: {
        src: [
            "build/<%= pkg.codename %>.css",
            "build/<%= pkg.codename %>.min.css",
          ]
      }
    },
    
    // uglify
    uglify: {
      options: {
        mangle: false
      },
      build: {
    		src: ['js/*.js'],
    		dest: 'build/<%= pkg.codename %>.min.js'
  	  }
    },
    
    // concat
    concat: {
      build: {
  	    files: {
  		  'build/<%= pkg.codename %>.js':'js/*.js'
  	    }
  	  }
    },

    // assemble
    assemble: {
  	  options: {
        flatten: true,
        assets: 'assets',
        partials: 'site-src/contents/pages/**/*.hbs',
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

    // watch
    watch: {
      main: {
        files: ['less/**/*', 'site-src/contents/**/*', 'site-src/less/*', 'js/*'],
        tasks: ['default']
      }
    }
  });
  
  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'usebanner', 'assemble']);
  grunt.registerTask('js', ['uglify', 'concat']);
  grunt.registerTask('dev', ['watch']);
  
}