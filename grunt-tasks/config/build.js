/**
 * Grunt-watch
 * Watch for files and run task on change
 */

module.exports = function(grunt) {
    grunt.config.set('build', {
        default: {
            tasks: ['sass:dist', 'copy:dist']
        }
    });
};
