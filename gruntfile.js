module.exports = function(grunt)
{
    require('project-grunt')(grunt, {
        distFolder: '.',
        jsFolder: 'assets/js',
        cssFolder: 'assets/css'
    });
};
// module.exports = function(grunt)
// {
//     require('jit-grunt')(grunt);
//     grunt.initConfig(
//     {
//         jshint:
//         {
//             all: ['src/js/**/*.js']
//         },
//         uglify:
//         {
//             deploy:
//             {
//                 files:
//                 {
//                     'assets/js/main.js': 'assets/js/main.js'
//                 }
//             }
//         },
//         concat:
//         {
//             less:
//             {
//                 src: ['src/less/**/*.less', ],
//                 dest: 'temp/concat.less',
//             },
//             js:
//             {
//                 src: ['src/js/**/*.js', 'src/main.js'],
//                 dest: 'assets/js/main.js',
//             },
//         },
//         less:
//         {
//             development:
//             {
//                 options:
//                 {
//                     compress: true,
//                     yuicompress: true,
//                     optimization: 2
//                 },
//                 files:
//                 {
//                     // destination file and source file
//                     'assets/css/main.css': ['temp/concat.less']
//                 }
//             }
//         },
//         clean:
//         {
//             temp: ["temp/"]
//         },
//         watch:
//         {
//             js:
//             {
//                 // which files to watch
//                 files: ['src/**/*.js'],
//                 tasks: ['jshint', 'concat'],
//             },
//             concat:
//             {
//                 files: ['src/less/**/*.less'],
//                 tasks: ['concat'],
//             },
//             less:
//             {
//                 // which files to watch
//                 files: ['temp/concat.less'],
//                 tasks: ['less'],
//             },
//         }
//     });

//     grunt.registerTask('default', ['jshint', 'concat', 'clean:temp', 'uglify', 'less']);
//     grunt.registerTask('dev', ['watch']);
// };