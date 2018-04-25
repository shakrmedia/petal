/*!
 * petal - Gruntfile
 * http://shakrmedia.github.io/petal
 * Copyright 2015-2018 Shakr Media Co., Ltd.
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
      banner: '/* \n' +
              ' * <%= pkg.name %> v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> \n' +
              ' * <%= pkg.description %> \n' +
              ' * <%= pkg.homepage %> \n' +
              ' * \n' +
              ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; <%= pkg.license %> License \n' +
              ' */\n',
      banner_compact: '/* <%= pkg.name %> v<%= pkg.version %> - (C)<%= grunt.template.today("yyyy") %> Shakr; <%= pkg.license %> License */'
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
      petal: {
        expand: true,
        cwd: "build",
        src: ["petal.css"],
        dest: "build"
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
      petal: {
        src: "build/petal.css",
        dest: "build/petal.min.css"
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
      petal: {
        src: ['js/*.js'],
        dest: 'build/<%= pkg.codename %>.min.js'
      },
      dist: {
        src: ['js/*.js'],
        dest: 'dist/<%= pkg.codename %>.min.js'
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
        'dist/<%= pkg.codename %>.js':'js/*.js'
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
          cwd: 'build',
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
      petal: {
        src: [
            "build/<%= pkg.codename %>.css",
            "build/<%= pkg.codename %>.min.css",
          ]
      },
      dist: {
        options: {
          banner: '<%= meta.banner_compact %>'
        },
        src: [
            "dist/<%= pkg.codename %>.css",
            "dist/<%= pkg.codename %>.min.css",
          ]
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
    'less:petal', 'less:docs',
    'postcss:petal', 'postcss:docs',
    'cssmin:petal',
    'uglify:petal', 'concat:petal', 'usebanner:petal',
    'copy:docs_assets', 'copy:docs_js',
    'assemble',
    'petal-dist']);
  grunt.registerTask('petal', ['less:petal', 'postcss:petal', 'cssmin:petal', 'uglify:petal', 'concat:petal', 'usebanner:petal']);
  grunt.registerTask('petal-dist', ['less:dist', 'postcss:dist', 'cssmin:dist', 'uglify:dist', 'concat:dist', 'usebanner:dist', 'copy:dist']);
  grunt.registerTask('js', ['uglify:petal', 'concat:petal']);
  grunt.registerTask('dev', ['connect', 'watch']);

}
