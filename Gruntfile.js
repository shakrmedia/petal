/*!
 * petal - Gruntfile
 * http://shakrmedia.github.io/petal
 * Copyright 2015 Shakr Media Co., Ltd.
 */

module.exports = function(grunt) {
  'use strict';
  
  require("load-grunt-tasks")(grunt);
  
  grunt.initConfig({
    less: {
      src: {
        expand: true,
        cwd: "less",
        src: ["petal.less"],
        ext: ".css",
        dest: "build"
      }
    },
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
    cssmin: {
      minify: {
        src: "build/petal.css",
        dest: "build/petal.min.css"
      }
    },
    watch: {
      less: {
        files: ['less/**/*'],
        tasks: ['default']
      }
    }
  });
  
  grunt.registerTask('default', ['less', 'autoprefixer', 'cssmin']);
  grunt.registerTask('dev', ['watch']);
  
}