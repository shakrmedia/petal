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
      main: {
        expand: true,
        cwd: "less",
        src: ["petal.less"],
        ext: ".css",
        dest: "build"
      },
      docs: {
        expand: true,
        cwd: "docs/less",
        src: ["*.less"],
        ext: ".css",
        dest: "./"
      }
    },

    // Autoprefixer
    autoprefixer: {
      options: {
        browser: ["last 3 versions", "ie 10"]
      },
      build: {
        expand: true,
        cwd: "build",
        src: ["petal.css"],
        dest: "build"
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

    // watch
    watch: {
      less: {
        files: ['less/**/*', 'docs/contents/**/*', 'docs/less/*'],
        tasks: ['default']
      }
    },
    
    // assemble
    assemble: {
  	  options: {
          flatten: true,
          partials: 'docs/contents/sections/*.hbs',
          layoutdir: 'docs/contents/frame',
          layout: 'default.hbs',
          data: 'package.json'
      },
      docs: {
        files: {
          'index': 'docs/contents/sections/*.hbs'
        }
      }
    }
  });
  
  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin', 'uglify', 'concat', 'usebanner', 'assemble']);
  grunt.registerTask('js', ['uglify', 'concat']);
  grunt.registerTask('dev', ['watch']);
  
}