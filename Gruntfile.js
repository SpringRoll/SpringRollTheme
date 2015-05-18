module.exports = function(grunt)
{
	require('project-grunt')(grunt,
	{
		distFolder: '.',
		jsFolder: 'assets/js',
		cssFolder: 'assets/css'
	});
};