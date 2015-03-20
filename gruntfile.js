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
            less:
            {
                src: ['src/less/**/*.less'],
                dest: 'temp/less/concat.less',
            },
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
                    "assets/css/main.css": ["temp/less/concat.less"]
                }
            }
        },
        watch:
        {
            js:
            {
                // which files to watch
                files: ["src/js/**/*.js"],
                tasks: ['jshint', 'concat'],
                options:
                {
                    nospawn: true
                }
            },
            less:
            {
                // which files to watch
                files: ["temp/less/concat.less"],
                tasks: ['less'],
                options:
                {
                    nospawn: true
                }
            },
        }
    });

    grunt.registerTask('default', ['jshint', 'concat', 'less']);
    grunt.registerTask('dev', ['watch']);
};