var gulp = require('gulp'),
	copy = require('gulp-copy'),
	clean = require('gulp-clean'),
	concat = require('gulp-concat'),
	watch = require('gulp-watch'),
	batch = require('gulp-batch'),
    sass = require('gulp-sass');

var paths = {
	source: {
        scss: ['src/Rsh/AdventureBundle/Resources/public/scss/main.scss'],
		css: ['src/Rsh/AdventureBundle/Resources/public/css/main.css', 'bower_components/Simple-Grid/simplegrid.css'],
		js: {
			mootools: [
				'bower_components/mootools/dist/mootools-core.js',
                'bower_components/Mootools-dataset/Source/Dataset.js',
				//'bower_components/mootools-more/mootools-more-all.js'
				'src/Rsh/AdventureBundle/Resources/public/js/mootools-more/*.js'
			],
			project: [
				//'src/Rsh/AdventureBundle/Resources/public/js/main.js',
				'src/Rsh/AdventureBundle/Resources/public/js/dd.js',
                'src/Rsh/AdventureBundle/Resources/public/js/services/*.js',
				'src/Rsh/AdventureBundle/Resources/public/js/gui/*.js'
			]
		}
	},
	public: {
		css: 'web/css',
		js:  'web/js'
	}
}
function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}

// Delete the public web css and js directory
gulp.task('clean', function () {
	return gulp.src([paths.public.css, paths.public.js])
		.pipe(clean());
});

gulp.task('sass', function () {
    gulp.src('src/Rsh/AdventureBundle/Resources/public/scss/main.scss')
        .pipe(sass({ errorHandler: handleError }))
        .pipe(gulp.dest(paths.public.css));
});

// copy files to web/js and web/css
gulp.task('build', ['clean'],function () {
    //gulp.start('sass');

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
	watch([
        'src/Rsh/AdventureBundle/Resources/public/js/*.js',
        'src/Rsh/AdventureBundle/Resources/public/js/services/*.js',
        'src/Rsh/AdventureBundle/Resources/public/js/gui/*.js'
    ], function () {
		gulp.start('build');
	});
    /*watch(['src/Rsh/AdventureBundle/Resources/public/scss/main.scss'], function () {
        gulp.start('sass');
    });*/
});

gulp.task('default', ['build', 'watch'], function () {
	console.log('Default task');
});
