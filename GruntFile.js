module.exports = grunt => {
  require("load-grunt-tasks")(grunt);

  grunt.initConfig({

    clean: ["dist"],

    copy: {
      src_to_dist: {
        cwd: "src",
        expand: true,
        src: ["**/*", "css/*.css", "!**/*.ts", "!**/*.js", "!**/*.scss", "!img/**/*"],
        dest: "dist"
      },
      pluginDef: {
        expand: true,
        src: ["plugin.json", "README.md"],
        dest: "dist"
      },
      img_to_dist: {
        cwd: "src",
        expand: true,
        src: ["img/**/*"],
        dest: "dist/src/"
      }
    },

    watch: {
      rebuild_all: {
        files: ["src/**/*", "plugin.json", "README.md"],
        tasks: ["default"],
        options: {
          spawn: false
        }
      }
    },

    tslint : {
      options: {
        configuration: "tslint.json"
      },
      files: {
        src: ['src/**/*.ts'],
      },
    },

    ts: {
      default: {
        tsconfig: './tsconfig.json'
      }
    }

  });

  grunt.registerTask("default", [
    "clean",
    "tslint",
    "ts:default",
    "copy:src_to_dist",
    "copy:pluginDef",
    "copy:img_to_dist"
  ]);
};