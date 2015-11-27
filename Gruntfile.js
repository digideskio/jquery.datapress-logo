module.exports = function(grunt){
  debug = true;

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');

  var myPkg = grunt.file.readJSON('package.json');
  grunt.file.setBase("static");

  grunt.initConfig({
    pkg: myPkg,
    clean: [
      "gen/",
    ],
    coffee: {
      app: {
        files: {
          "gen/app.js" : "coffee/app.coffee"
        },
        options: { 
          sourceMap: debug,
        }
      }
    },
    less: {
      bootstrap: {
        files: {
          "gen/bootstrap-custom.css" : "less/bootstrap-custom.less"
        },
        options: {
          sourceMap: debug,
          sourceMapFileInline: true,
          outputSourceFiles: true,
        }
      },
      app: {
        files: {
          "gen/app.css" : "less/app.less"
        },
        options: {
          sourceMap: debug,
          sourceMapFileInline: true,
          outputSourceFiles: true,
        }
      }
    },
    watch: {
      less1: {
        files: "less/bootstrap-custom.less",
        tasks: "less:bootstrap"
      },
      less2: {
        files: "less/app.less",
        tasks: "less:app"
      }
    }
  });

  grunt.registerTask('default', [
    "clean",
    "less",
    "coffee"
  ]);
};
