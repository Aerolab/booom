/**
 * Build
 * Compiles all assets and templates into dist folder
 */
module.exports = function (grunt) {
    grunt.registerTask('build', [
        'clean:dist',
        'sass',
        'copy'
    ]);
};
