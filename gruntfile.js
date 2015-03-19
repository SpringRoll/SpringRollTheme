module.exports = function(grunt)
{
    require('jit-grunt')(grunt);
    grunt.initConfig(
    {
        jshint:
        {
            all: ['src/js/**/*.js']
        },
        concat:
        {
            js:
            {
                src: ['src/js/**/*.js'],
                dest: 'assets/js/main.js',
            },
        },
        less:
        {
            development:
            {
                options:
                {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files:
                {
                    // destination file and source file
                    "assets/css/main.css": "src/less/*.less"
                }
            }
        },
        watch:
        {
            css:
            {
                // which files to watch
                files: ["src/less/*.less"],
                tasks: ['less'],
                options:
                {
                    nospawn: true
                }
            },
            js:
            {
                // which files to watch
                files: ["src/js/**/*.js"],
                tasks: ['jshint', 'concat'],
                options:
                {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less', 'jshint', 'concat']);
    grunt.registerTask('dev', ['watch']);
};