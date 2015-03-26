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
                src: ['src/less/**/*.less',],
                dest: 'temp/less/concat.less',
            },
            js:
            {
                src: ['src/js/**/*.js', 'src/main.js'],
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
                    'assets/css/main.css': ['temp/less/concat.less']
                }
            }
        },
        watch:
        {
            js:
            {
                // which files to watch
                files: ['src/**/*.js'],
                tasks: ['jshint', 'concat'],
            },
            concat:
            {
                files: ['src/less/**/*.less'],
                tasks: ['concat'],
            },
            less:
            {
                // which files to watch
                files: ['temp/less/concat.less'],
                tasks: ['less'],
            },
        }
    });

    grunt.registerTask('default', ['jshint', 'concat', 'less']);
    grunt.registerTask('dev', ['watch']);
};