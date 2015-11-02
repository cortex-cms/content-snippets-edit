'use strict';

require('dotenv').load();
var applicationName = 'content-snippets-edit',
  basePaths = {
    src: 'src/app/',
    dest: 'dist/',
    bower: 'bower_components'
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
    styles: paths.styles.src + 'main.scss',
    scripts: paths.scripts.src + '**/*.js',
    riot: '**/tags/**'
  },
  vendorFiles = {
    styles: 'src/vendor/**/*.css',
    scripts: 'src/vendor/**/*.js'
  },
  destFilenames = {
    script: applicationName + '.js',
    style: applicationName + '.css',
    scriptMin: applicationName + '.min.js',
    styleMin: applicationName + '.min.css'
  },
  gulp = require('gulp'),
  streamqueue = require('streamqueue'),
  bowerFiles = require('main-bower-files'),
  plugins = require("gulp-load-plugins")({
    pattern: ['gulp-*', 'gulp.*'],
    replaceString: /\bgulp[\-.]/
  }),
  changeEvent = function (event) {
    plugins.util.log('File', plugins.util.colors.cyan(event.path.replace(new RegExp('/.*(?=/' + basePaths.src + ')/'), '')), 'was', plugins.util.colors.magenta(event.type));
  },
  scriptsStream = gulp.src([vendorFiles.scripts, appFiles.scripts, '!**/tags/**']),
  riotStream = gulp.src(appFiles.riot)
    .pipe(plugins.riot()),
  bowerStream = gulp.src(bowerFiles({
    filter: '**/*.js'
  })),
  sassStream = plugins.rubySass(appFiles.styles, {loadPath: basePaths.bower})
    .on('error', function (err) {
      new plugins.util.PluginError('SASS', err, {showStack: true});
    }),
  vendorStylesStream = gulp.src(vendorFiles.styles);

gulp.task('styles', function () {
  return streamqueue({objectMode: true}, sassStream, vendorStylesStream)
    .pipe(plugins.concat(destFilenames.style))
    .pipe(plugins.autoprefixer('last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4', 'Firefox >= 4'))
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('scripts', function () {
  return streamqueue({objectMode: true}, bowerStream, riotStream, scriptsStream)
    .pipe(plugins.concat(destFilenames.script))
    .pipe(plugins.size())
    .pipe(gulp.dest(paths.scripts.dest));
});

gulp.task('minify-styles', ['styles'], function () {
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

gulp.task('build', ['styles', 'scripts']);

gulp.task('watch', ['build'], function () {
  gulp.watch([paths.styles.src + '**/*.scss', vendorFiles.styles], ['styles']).on('change', function (event) {
    changeEvent(event);
  });
  gulp.watch([appFiles.scripts, vendorFiles.scripts, appFiles.riot], ['scripts']).on('change', function (event) {
    changeEvent(event);
  });
});

gulp.task('compile', ['minify-scripts', 'minify-styles']);

gulp.task('default', ['build']);
