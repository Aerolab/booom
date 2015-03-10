/**
 * Clean
 * Cleans directory
 */

module.exports = function(grunt) {
    grunt.config.set('clean', {
        dist: {
            files: [{
                dot: true,
                src: [
                    '.tmp',
                    '<%= vars.dist %>/*',
                    '!<%= vars.dist %>/.git*'
                ]
            }]
        }
    });
};
