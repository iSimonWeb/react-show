module.exports = function(grunt) {
	require('time-grunt')(grunt);
	grunt.initConfig({
		config: {
			sourceDir: 'src',
			distDir: 'dist'
		},


		//         ******   ********  ********
		//        **////** **//////  **////// 
		//       **    // /**       /**       
		//      /**       /*********/*********
		//      /**       ////////**////////**
		//      //**    **       /**       /**
		//       //******  ********  ******** 
		//        //////  ////////  ////////  

		less: {
			options: {
				paths: ["<%= config.distDir %>/css"],
				modifyVars: {
					'bower_components': '"../../bower_components"'
				}
			},
			dev: {
				files: {
					"<%= config.distDir %>/css/main.css": "<%= config.sourceDir %>/css/main.less"
				}
			},
			prod: {
				options: {
					cleancss: true
				},
				files: {
					"<%= config.distDir %>/css/main.css": "<%= config.sourceDir %>/css/main.less"
				}
			}
		},

		autoprefixer: {
			options: {
				browsers: [
					'Android 2.3',
					'Android >= 4',
					'Chrome >= 20',
					'Firefox >= 24', // Firefox 24 is the latest ESR
					'Explorer >= 8',
					'iOS >= 6',
					'Opera >= 12',
					'Safari >= 6'
				]
			},

			main: {
				src: '<%= config.distDir %>/css/main.css',
				dest: '<%= config.distDir %>/css/main.css'
			}
		},

		//            **  ********
		//           /** **////// 
		//           /**/**       
		//           /**/*********
		//           /**////////**
		//       **  /**       /**
		//      //*****  ******** 
		//       /////  ////////  

		browserify: {
			options: {
				transform: [require('grunt-react').browserify]
			},
			app: {
				src: '<%= config.sourceDir %>/layouts/Slideshow.jsx',
				dest: '<%= config.distDir %>/js/reactshow.js'
			}
		},

		react: {
			'reactshow': {
				files: {
					'<%= config.distDir %>/js/reactshow.js': [
						'<%= config.sourceDir %>/components/ReactTransitionEvents.jsx',
						'<%= config.sourceDir %>/atoms/DirectionNav.jsx',
						'<%= config.sourceDir %>/atoms/AnimatedImage.jsx',
						'<%= config.sourceDir %>/components/Slide.jsx',
						'<%= config.sourceDir %>/layouts/Slideshow.jsx'
					]
				}
			}
		},

		jshint: {
			beforeconcat: ['Gruntfile.js', '<%= config.sourceDir %>/js/*.js']
		},

		uglify: {
			prod: {
				files: {
					'<%= config.distDir %>/js/reactshow.min.js': '<%= config.distDir %>/js/reactshow.js',
				}
			}
		},


		//      ** ****     ****     **       ********  ********  ********
		//      /**/**/**   **/**    ****     **//////**/**/////  **////// 
		//      /**/**//** ** /**   **//**   **      // /**      /**       
		//      /**/** //***  /**  **  //** /**         /******* /*********
		//      /**/**  //*   /** **********/**    *****/**////  ////////**
		//      /**/**   /    /**/**//////**//**  ////**/**             /**
		//      /**/**        /**/**     /** //******** /******** ******** 
		//      // //         // //      //   ////////  //////// ////////  

		imagemin: {
			prod: {
				files: [{
					expand: true,
					cwd: '<%= config.distDir %>/images',
					src: ['**/*.{png,jpg,gif}'],
					dest: '<%= config.distDir %>/images/'
				}]
			}
		},

		dataUri: {
			dist: {
				src: ['<%= config.distDir %>/css/*.css'],
				dest: '<%= config.distDir %>/css',
				options: {
					target: ['<%= config.distDir %>/images/*'],
					fixDirLevel: true,
					maxBytes: 2048

				}
			}
		},


		//       ****     **** **  ********   ****** 
		//      /**/**   **/**/** **//////   **////**
		//      /**//** ** /**/**/**        **    // 
		//      /** //***  /**/**/*********/**       
		//      /**  //*   /**/**////////**/**       
		//      /**   /    /**/**       /**//**    **
		//      /**        /**/** ********  //****** 
		//      //         // // ////////    //////  

		clean: ['<%= config.distDir %>/**'],

		connect: {
			server: {
				options: {
					port: 9001,
					hostname: '*',
					base: '<%= config.distDir %>'
				}
			}
		},

		copy: {
			"static-files": {
				files: [{
						expand: true,
						cwd: '<%= config.sourceDir %>',
						src: ['fonts/**', 'images/**', 'static/**'],
						dest: '<%= config.distDir %>/'
					},

					// Font-Awesome
					{
						expand: true,
						cwd: 'bower_components/font-awesome/fonts/',
						src: '*',
						dest: '<%= config.distDir %>/fonts'
					},
					
					{
						expand: true,
						cwd: '<%= config.sourceDir %>/',
						src: ['*.html'],
						dest: '<%= config.distDir %>/'
					},

					{
						expand: true,
						flatten: true,
						src: "bower_components/react/react-with-addons.js",
						dest: "<%= config.distDir %>/js/"
					}
				],

			}
		},

		watch: {
			grunt: {
				files: 'Gruntfile.js',
				tasks: 'build:dev'
			},

			html: {
				files: '<%= config.sourceDir %>/**/*.html',
				tasks: 'copy'
			},

			images: {
				files: '<%= config.sourceDir %>/images/*',
				tasks: 'copy'
			},

			css: {
				files: '<%= config.sourceDir %>/css/**',
				tasks: ['less:dev', 'autoprefixer']
			},

			js: {
				files: '<%= config.sourceDir %>/**/*.jsx',
				tasks: ['jshint', /*'concat', 'browserify,'*/ 'react']
			},

			options: {
				livereload: true,
			}
		}

	});


	// CSS
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-autoprefixer');

	// JS
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-react');
	//grunt.loadNpmTasks('grunt-browserify');

	// Dev
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');
	// grunt.loadNpmTasks('grunt-connect-proxy');

	// Prod
	// grunt.loadNpmTasks('grunt-data-uri');
 //    grunt.loadNpmTasks('grunt-ftp-deploy');

	// Misc
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-notify');
	grunt.loadNpmTasks('grunt-contrib-clean');



	grunt.registerTask('_build', ['clean', 'copy', /*'concat', 'browserify',*/ 'react', 'jshint']);

	grunt.registerTask('build:dev', ['_build', 'less:dev', 'autoprefixer']);
	// grunt.registerTask('build:prod', ['_build', 'less:dev', 'autoprefixer', 'uglify']);


    // grunt.registerTask('deploy:prod', ['build:prod', 'ftp-deploy:prod']);

	grunt.registerTask('server', ['connect', 'watch']);

	grunt.registerTask('default', ['build:dev', 'server']);

};