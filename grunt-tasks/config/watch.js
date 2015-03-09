/**
 * Grunt-watch
 * Watch for files and run task on change
 */

module.exports = function(grunt) {
    grunt.config.set('watch', {
        sass: {
            files: ['<%= vars.app %>/{,*/}*.*'],
            tasks: ['build']
        }
    });
};
