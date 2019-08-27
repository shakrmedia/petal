/*!
 * petal - Gruntfile
 * http://shakrmedia.github.io/petal
 * Copyright 2015-2019 Shakr Media Co., Ltd.
 */

module.exports = function(grunt) {
  'use strict';

  require("load-grunt-tasks")(grunt, {
    pattern: ['grunt-*']
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Meta
    meta: {
      banner: ['/* ',
              ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> ',
              ' * <%= pkg.description %> ',
              ' * <%= pkg.homepage %> ',
              ' * ',
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> License ',
              ' */'].join('\n'),
      banner_compact: '/* <%= pkg.name %> v<%= pkg.version %> - (C)<%= grunt.template.today("yyyy") %> Shakr; <%= pkg.license %> License */',
      banner_selecter: ['/* ',
                        ' * Selecter v3.2.4 - 2015-01-07 ',
                        ' * A jQuery plugin for replacing default select elements. Part of the Formstone Library. ',
                        ' * http://formstone.it/selecter/ ',
                        ' * ',
                        ' * Copyright 2015 Ben Plum; MIT Licensed ',
                        ' */'].join('\n')
    },

    // LESS
    less: {
      docs: {
        expand: true,
        cwd: "docs-src/less",
        src: ["docs.less"],
        ext: ".css",
        dest: "docs/assets"
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
          dest: "dist"
        }]
      }
    },

    // postcss (autoprefixer)
    postcss: {
      options: {
        processors: [
          require('autoprefixer')({
            browsers:["last 3 versions", "ie 10"],
            remove: false
          })
        ]
      },
      docs: {
        expand: true,
        cwd: "docs/assets",
        src: ["docs.css"],
        dest: "docs/assets"
      },
      dist: {
        expand: true,
        cwd: "dist",
        src: ["petal.css"],
        dest: "dist"
      }
    },

    // css minify
    cssmin: {
      docs: {
        src: "docs/assets/docs.css",
        dest: "docs/assets/docs.min.css"
      },
      dist: {
        src: "dist/petal.css",
        dest: "dist/petal.min.css"
      }
    },

    // uglify
    uglify: {
      options: {
        mangle: false
      },
      dist: {
        files: {
          'dist/petal.min.js': 'js/petal-functions.js',
          'dist/jquery.fs.selecter.min.js': 'js/jquery.fs.selecter.js'
        }
      }
    },

    copy: {
      docs_assets: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['**/*.png','**/*.jpg','**/*.svg','**/*.woff','**/*.woff2','**/*.ttf','**/*.eot'],
          dest: 'docs/assets'
        }]
      },
      docs_js: {
        files: [{
          expand: true,
          cwd: 'dist',
          src: ['*.js'],
          dest: 'docs/assets'
        }, {
          expand: true,
          cwd: 'docs-src/js',
          src: ['*.js'],
          dest: 'docs/assets'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'assets',
          src: ['petalicon.*'],
          dest: 'dist'
        }]
      }
    },

    // assemble
    assemble: {
      options: {
        flatten: true,
        helpers: [
          'handlebars-helpers',
          'handlebars-helper-eachitems'
        ],
        assets: 'docs/assets',
        partials: 'docs-src/contents/**/*.hbs',
        layoutdir: 'docs-src/contents/layouts',
        layout: 'default-layout.hbs',
        data: 'package.json'
      },

      landing: {
        files: {
          'docs/': ['docs-src/contents/pages/*.hbs' ],
        }
      },

      start: {
        options: {
          layout: 'docs-layout.hbs'
        },
        files: {
          'docs/start': ['docs-src/contents/pages/start/*.hbs' ],
        }
      },

      docs: {
        options: {
          layout: 'docs-layout.hbs'
        },
        files: {
          'docs/docs': ['docs-src/contents/pages/docs/*.hbs' ],
        }
      }

    },

    // Banner
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= meta.banner %>'
      },
      full: {
        options: {
          banner: '<%= meta.banner %>'
        },
        src: [
          "dist/<%= pkg.codename %>.css"
        ]
      },
      compact: {
        options: {
          banner: '<%= meta.banner_compact %>'
        },
        src: [
          "dist/<%= pkg.codename %>.min.css",
          "dist/<%= pkg.codename %>.min.js",
        ]
      },
      selecter: {
        options: {
          banner: '<%= meta.banner_selecter %>',
        },
        src: ['dist/jquery.fs.selecter.min.js']
      }
    },

    // start webserver
    connect: {
      main: {
        options: {
          port: 9000,
          base: 'docs/',
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
        files: ['less/**/*', 'docs-src/**/*', 'js/*'],
        tasks: ['default']
      }
    }
  });

  grunt.registerTask('default', [
    'petal-dist',
    'petal-docs'
  ]);
  grunt.registerTask('petal-dist', [
    'less:dist', 'postcss:dist', 'cssmin:dist',
    'uglify:dist',
    'usebanner:full', 'usebanner:compact', 'usebanner:selecter',
    'copy:dist'
  ]);
  grunt.registerTask('petal-docs', [
    'less:docs', 'postcss:docs', 'cssmin:docs',
    'copy:docs_assets', 'copy:docs_js', 'assemble'
  ]);
  grunt.registerTask('js', ['uglify:dist']);
  grunt.registerTask('dev', ['connect', 'watch']);
}
