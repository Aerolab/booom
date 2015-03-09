/**
 * Grunt-watch
 * Watch for files and run task on change
 */

module.exports = function(grunt) {
    grunt.config.set('watch', {
        sass: {
            files: ['<%= vars.app %>{,*/}*.{css,js,json,plist,png,gif,jpg,svg}'],
            tasks: ['build']
        }
    });
};
