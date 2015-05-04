'use strict';

var applicationName = 'content-snippets',
  basePaths = {
    src: 'src/app/',
    dest: 'dist/'
  },
  paths = {
    scripts: {
      src: basePaths.src,
      dest: basePaths.dest
    },
    styles: {
      src: basePaths.src + 'sass/',
      dest: basePaths.dest
    }
  },
  appFiles = {
    styles: paths.styles.src,
    scripts: paths.scripts.src + '**/*.js'
  },
  vendorFiles = {
    scripts: 'src/vendor/**/*.js'
  },
  destFilenames = {
    script: applicationName + '.js',
    style: applicationName + '.css',
    scriptMin: applicationName + '.min.js',
    styleMin: applicationName + '.min.css'
  },
  gulp = require('gulp'),
  es = require('event-stream'),
  bowerFiles = require('main-bower-files'),
  plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
  });

var changeEvent = function (evt) {
  plugins.util.log('File', plugins.util.colors.cyan(evt.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', plugins.util.colors.magenta(evt.type));
};

var scriptsStream = function () {
  return gulp.src([appFiles.scripts, vendorFiles.scripts, '!**/tags/**']);
};

var riotStream = function () {
  return gulp.src('**/tags/**')
    .pipe(plugins.riot());
};

var bowerStream = function () {
  return gulp.src(bowerFiles({
    filter: '**/*.js'
  }));
};

gulp.task('sass', function () {
  return plugins.rubySass(appFiles.styles)
    .on('error', function (err) {
      new plugins.util.PluginError('SASS', err, {showStack: true});
    })
    .pipe(plugins.concat(destFilenames.style))
    .pipe(plugins.autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function () {
  return es.merge(scriptsStream(), riotStream(), bowerStream())
    .pipe(plugins.concat(destFilenames.script))
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('minify-css', ['sass'], function () {
  return gulp.src(paths.styles.dest + destFilenames.style)
    .pipe(plugins.combineMq())
    .pipe(plugins.minifyCss())
    .pipe(plugins.rename(destFilenames.styleMin))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('minify-scripts', ['scripts'], function () {
  return gulp.src(paths.scripts.dest + destFilenames.script)
    .pipe(plugins.uglify())
    .pipe(plugins.rename(destFilenames.scriptMin))
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('build', ['sass', 'scripts']);

gulp.task('watch', ['build'], function () {
  gulp.watch(appFiles.styles + '**/*.scss', ['sass']).on('change', function (evt) {
    changeEvent(evt);
  });
  gulp.watch([appFiles.scripts, vendorFiles.scripts], ['scripts']).on('change', function (evt) {
    changeEvent(evt);
  });
});

gulp.task('compile', ['minify-scripts', 'minify-css']);

gulp.task('default', ['build']);
