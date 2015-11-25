module.exports = function(grunt){
  debug = true;

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: [
      "static/gen/",
    ],
    less: {
      bootstrap: {
        files: {
          "static/gen/bootstrap-custom.css" : "less/bootstrap-custom.less"
        },
        options: {
          compress: !debug,
          sourceMap: debug,
        }
      },
      app: {
        files: {
          "static/gen/app.css" : "less/app.less"
        },
        options: {
          compress: !debug,
          sourceMap: debug,
          sourceMapFilename: "static/gen/app.css.map",
          sourceMapURL: "/gen/app.css.map",
          sourceMapRootpath: "/gen",
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
    "less"
  ]);
};
