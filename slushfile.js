var gulp = require('gulp')
var install = require('gulp-install')
var conflict = require('gulp-conflict')
var rename = require('gulp-rename')
var template = require('gulp-template')
var inquirer = require('inquirer')

gulp.task('default', function (done) {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Give your app a name',
      default: getNameProposal()
    },
    {
      type: 'input',
      name: 'description',
      message: 'Give your app a description',
      default: 'a node api server project.'
    },
    {
      type: 'confirm',
      name: 'private',
      message: 'Private?',
      default: true
    },
    {
      type: 'confirm',
      name: 'unit',
      message: 'Setup unit tests with Mocha, chai, supertest?',
      default: true
    },
    {
      type: 'input',
      name: 'github',
      message: 'git repository',
      default: ""
    },
    {
      type: 'input',
      name: 'author',
      message: 'author',
      default: ""
    },
    {
      type: 'input',
      name: 'port',
      message: 'your app will listen to port ?',
      default: 5443
    },
    {
      type: 'input',
      name: 'license',
      message: 'license',
      default: 'ISC'
    },
    {
      type: 'confirm',
      name: 'moveon',
      message: 'Continue?'
    }
  ],
  function (answers) {
    if (answers.github) {
      answers.github = answers.github.replace(/\/$/, '') + '/' + answers.name
    }

    if (!answers.moveon) {
      return done()
    }

    var filesPath = __dirname + '/template/**'

    gulp.src(filesPath, { dot: true })
      .pipe(template(answers))
      .pipe(rename(function (file) {
        if (file.basename[0] === '_') {
          file.basename = '.' + file.basename.slice(1)
        }
      }))
      .pipe(conflict('./'))
      .pipe(gulp.dest('./'))
      .pipe(install())
      .on('end', function () {
        done()
      })
      .resume()
  });
})

function getNameProposal () {
  var path = require('path')
  try {
    return require(path.join(process.cwd(), 'package.json')).name
  } catch (e) {
    return path.basename(process.cwd())
  }
}
