module.exports = function(grunt)
{
	require('jit-grunt')(grunt);
    grunt.initConfig(
    {
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
            styles:
            {
				// which files to watch
                files: ["src/less/*.less"], 
                tasks: ['less'],
                options:
                {
                    nospawn: true
                }
            }
        }
    });

    grunt.registerTask('default', ['less']);
	grunt.registerTask('dev', ['watch']);
};