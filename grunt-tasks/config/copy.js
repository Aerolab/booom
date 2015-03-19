/**
 * Grunt-copy
 * Prepares files for distribution
 */

module.exports = function(grunt) {
    grunt.config.set('copy', {
        dist: {
            files: [{
                expand: true,
                dot: true,
                cwd: '<%= vars.app %>',
                dest: '<%= vars.dist %>/booom_chrome',
                src: [
                    'assets/{,*/}*.*',
                    'icons/{,*/}*.*',
                    'js/{,*/}*.js',
                    'manifest.json'
                ]
            },{
                expand: true,
                dot: true,
                cwd: '<%= vars.app %>',
                dest: '<%= vars.dist %>/booom.safariextension',
                src: [
                    'assets/{,*/}*.*',
                    'icons/{,*/}*.*',
                    'js/{,*/}*.js',
                    'Info.plist'
                ]
            },{
                expand: true,
                dot: true,
                cwd: '<%= vars.app %>/icons',
                dest: '<%= vars.dist %>/booom.safariextension',
                src: [
                    'icon.png'
                ]
            }]
        }
    });
};
