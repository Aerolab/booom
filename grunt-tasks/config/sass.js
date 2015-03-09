/**
 * Sass
 * Libsass compiler
 */

module.exports = function(grunt) {
    grunt.config.set('sass', {
        dist: {
            options: {
                sourcemap: 'none'
            },
            files: {
                '<%= vars.dist %>/booom_chrome/styles/styles.css' : ['<%= vars.app %>/styles/chrome.scss'],
                '<%= vars.dist %>/booom.safariextension/styles/styles.css' : ['<%= vars.app %>/styles/safari.scss']
            }
        }
    });
};
