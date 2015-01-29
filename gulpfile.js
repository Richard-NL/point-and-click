var gulp = require('gulp'),
	copy = require('gulp-copy'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	batch = require('gulp-batch');

var paths = {
	source: {
		css: ['bower_components/bootstrap/dist/css/bootstrap.min.css'],
		js: {
			mootools: [
				'bower_components/mootools/dist/mootools-core.js',
				//'bower_components/mootools-more/mootools-more-all.js'
				'src/Rsh/AdventureBundle/Resources/public/js/mootools-more/*.js'
			],
			project: ['src/Rsh/AdventureBundle/Resources/public/js/main.js', 'src/Rsh/AdventureBundle/Resources/public/js/gui/*.js']
		}
	},
	public: {
		css: 'web/css',
		js:  'web/js'
	}
}

// Delete the public web css and js directory
gulp.task('clean', function () {
	return gulp.src([paths.public.css, paths.public.js])
		.pipe(clean());
});

// copy files to web/js and web/css
gulp.task('build', ['clean'],function () {
	gulp.src(paths.source.css)
		.pipe(gulp.dest(paths.public.css));
	
	gulp.src(paths.source.js.mootools)
		.pipe(concat('mootools.libs.js'))
		.pipe(gulp.dest(paths.public.js));

	gulp.src(paths.source.js.project)
		.pipe(concat('project.js'))
		.pipe(gulp.dest(paths.public.js));
});

gulp.task('watch', function () {
	watch(['src/Rsh/AdventureBundle/Resources/public/js/gui/*.js', 'src/Rsh/AdventureBundle/Resources/public/js/*.js'], function () {
		gulp.start('build');
	});
});

gulp.task('default', ['build', 'watch'], function () {
	console.log('Default task');
});