module.exports = function (grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('./package.json'),

    connect: {
      dev: {
        options: {
          port: 8000,
          base: './dist/',
          keepalive: true
        }
      }
    },

    assemble: {
      options: {
        layout: 'page.hbs',
        layoutdir: './src/bonnet/layouts/',
        partials: './src/bonnet/partials/**/*.hbs',
        helpers: './src/bonnet/helpers/**/*.js'
      },
      posts: {
        files: [
          {
            cwd: './src/content/',
            dest: './dist/',
            expand: true,
            src: ['**/*.hbs', '!_pages/**/*.hbs']
          },
          {
            cwd: './src/content/_pages/',
            dest: './dist/',
            expand: true,
            src: '**/*.hbs'
          }
        ],
        collections: [{
          name: 'post',
          sortby: 'posted',
          sortorder: 'descending'
        }],
      }
    }
  });

  /* load every plugin in package.json */
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('assemble');

  /* grunt tasks */
  grunt.registerTask('default', ['assemble', 'connect']);

};