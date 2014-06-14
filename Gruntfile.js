module.exports = function (grunt) {

	grunt.initConfig({
		compass   : {
			dist: {
				files: {
					'dist/style.css': 'css/style.scss'
				}
			}
		},
		watch     : {
			files  : ['css/**/*.scss'],
			tasks  : ['sass'],
			options: {
				livereload: true
			}
		},
		nodewebkit: {
			options: {
				build_dir: './build',
				mac      : true,
				win      : false,
				linux32  : false,
				linux64  : false
			},
			src    : ['./dist/**/*' ]
		},
		copy      : {
		}
	});

	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-node-webkit-builder');

	grunt.registerTask('css', ['compass']);
	grunt.registerTask('default', ['compass']);
	grunt.registerTask('nwbuild', ['nodewebkit', 'copy']);

};
