var gulp =            require('gulp');
var sass =            require('gulp-sass');
var sourcemaps =      require('gulp-sourcemaps');
var minifyCSS =       require('gulp-minify-css');
var mainBowerFiles =  require('main-bower-files');
var uglify =          require('gulp-uglify');
var concat =          require('gulp-concat');
var notify =          require('gulp-notify');
var autoprefixer =    require('gulp-autoprefixer');
var browserSync =     require('browser-sync').create();
var jshint =          require('gulp-jshint');
var rename =          require('gulp-rename');
var responsive =      require('gulp-responsive');
var imagemin =        require('gulp-imagemin');
var pngquant =        require('imagemin-pngquant');
var newer =           require('gulp-newer');
var changed =         require('gulp-changed');
var plumber =         require('gulp-plumber');
var svgSprite =       require('gulp-svg-sprite');

// libsass
gulp.task('sass', function () {
  return gulp.src('./_scss/style.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        './node_modules/susy/sass' //required for sass
      ]
    }))
    .pipe(autoprefixer('> 5%', 'last 2 version', 'Firefox ESR', 'Opera 12.1', 'ie 11', 'ie 10', 'ie 9'))
    .pipe(minifyCSS()) //move to prod settings
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./html/css/'))
    .pipe(browserSync.stream());
});

// libsass for ie stylsheets
gulp.task('sass-ie', function () {
  return gulp.src('./_scss/style-ie.scss')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: [
        './node_modules/susy/sass' //required for sass
      ]
    }))
    .pipe(autoprefixer('> 5%', 'last 2 version', 'Firefox ESR', 'Opera 12.1', 'ie 11', 'ie 10', 'ie 9'))
    .pipe(minifyCSS()) //move to prod settings
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./html/css/'))
    .pipe(browserSync.stream());
});

// javascripts
gulp.task('js', ['bower'], function() {
  return gulp.src(['./html/js/vendor/vendor.js', './html/js/global.js'])
    .pipe(jshint())
    .pipe(concat('./html/js-build/global.build.js'))
    .pipe(rename('global.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./html/js-build/'))
    .pipe(browserSync.stream());
});

// grab all main bower files, concat them, and put into my vendor.js file
gulp.task('bower', function() {
  return gulp.src(mainBowerFiles(), { base: './bower_components/**'})
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./html/js/vendor/'))
});

gulp.task('images', function() {
  browserSync.notify('Responsive images starting.');
  return gulp.src('images-source/**/*.{jpg,jpeg,png,tiff,webp,gif}')
    .pipe(changed('./html/images-build'))
    .pipe(plumber())
    .pipe(responsive({
      '**/*.{jpg,png,tiff,webp,gif}': [{
          width: 320,
          rename: {
            suffix: "-320"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 480,
          rename: {
            suffix: "-480"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 640,
          rename: {
            suffix: "-640"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 800,
          rename: {
            suffix: "-800"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 1024,
          rename: {
            suffix: "-1024"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 1280,
          rename: {
            suffix: "-1280"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 1600,
          rename: {
            suffix: "-1600"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 1890,
          rename: {
            suffix: "-1890"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          width: 2400,
          rename: {
            suffix: "-2400"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      },{
          rename: {
            suffix: "-original"
          },
          withoutEnlargment: true,
          passThroughUnused: false
      }]
    }))
    .pipe(imagemin({
      progressive: true,
      use: [pngquant()]
    }))
    .pipe(gulp.dest('./html/images-build'));
});

svgSpriteConfig = {
    shape: {
        dimension: {         // Set maximum dimensions

        },
        spacing: {         // Add padding
            padding: 0,
            box: 'content'
        },
        dest: 'out/intermediate-svg'    // Keep the intermediate files
    },
    mode: {
        view: false,
        symbol: false,
        defs: {
            inline: true
        }     // Activate the «symbol» mode
    }
};

gulp.task('svg-icons', function() {
    return gulp.src('./icons/**/*.svg')
        .pipe(svgSprite(svgSpriteConfig))
        .pipe(gulp.dest('./html/svg'))
        .pipe(browserSync.stream());
});

// watch tasks and serve via browserSync
gulp.task('serve', ['sass', 'sass-ie', 'js', 'images', 'svg-icons'], function() {
  browserSync.init({
    proxy: 'turnipthebeetfarm.tim'
  });

  gulp.watch('images-source/**/*.{jpg,jpeg,png,tiff,webp,gif}', ['images']);
  gulp.watch('./html/js/**/*.js', ['js']);
  gulp.watch('./icons/**/*.svg');
  gulp.watch('./_scss/**', ['sass', 'sass-ie']);
  gulp.watch("./html/**/*.php").on("change", browserSync.reload);
});

gulp.task('default', ['serve']);
