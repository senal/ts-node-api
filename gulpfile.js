const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const mocha = require('gulp-mocha');

// pull in the project typescript config
const tsproject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
    const tsResult = tsproject.src()
    .pipe(tsproject());
    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('watch', ['scripts'], () => {
    gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('assets', function(){
    return gulp.src(JSON_FILES)
    .pipe(gulp.dest('dist'));
});

gulp.task('test', () => {
    return gulp.src('test/**/*.test.ts')
     .pipe(mocha({
        reporter: 'spec',
        require: ['ts-node/register']
    }));
});
gulp.task('default', ['watch', 'assets']);