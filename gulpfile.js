const { src, dest, task } = require('gulp')
const clean = require('gulp-clean')

task(
  'build',
  () => {
    return src([
        '**',
        '!build/**',
        '!vendor/**',
        '!wpcs/**',
        '!node_modules/**',
        '!./gulpfile.js',
        '!./ruleset.xml',
        '!./composer.json',
        '!./composer.lock',
        '!./package-lock.json',
        '!./package.json',
        '!app/vue/node_modules/**',
        '!app/vue/public/**',
        '!app/vue/pure/**',
        '!app/vue/src/**',
        '!app/vue/babel.config.js',
        '!app/vue/vue.config.js',
        '!app/vue/package-lock.json',
        '!app/vue/package.json',
        '!app/vue/README.md',
        '!app/vue/dist/favicon.ico',
        '!app/vue/dist/index.html',
      ])
      .pipe(dest('./build/'))
  }
)