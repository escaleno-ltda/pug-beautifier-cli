#!/usr/bin/env node

'use strict'

const fs = require('fs')
const program = require('commander')
const beautify = require('pug-beautify')
const globby = require('globby')

const options = {}

const quit = function (err) {
  if (err) {
    console.error(err) // eslint-disable-line
    process.exit(1)
  } else {
    process.exit(0)
  }
}

program
  .version(require('./package.json').version)
  .usage('[options] [file]')
  .option('-t, --filltab <tab_size>', 'fill <tab_size> tab rather than space, default 2 space', parseInt)
  .option('-d, --keepdiv', 'keep div tag, default no.')
  .option('-e, --encoding <encoding>', '<encoding>, default utf8')
  .parse(process.argv)

options.fill_tab = typeof program.filltab !== 'undefined'
options.tab_size = (typeof program.filltab === 'undefined') ? 2 : program.filltab
if (isNaN(options.tab_size)) quit(new Error('invalid tab_size'))
options.omit_div = typeof program.keepdiv === 'undefined'
options.encoding = (typeof program.encoding === 'undefined') ? 'utf8' : program.encoding

const globs = program.args[0]

const lintFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, options.encoding, (err, content) => {
      if (err) return reject(err)
      const code = beautify(content, options)
      fs.writeFile(path, code, err => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
}

globby([globs])
  .then(paths => paths.map(lintFile))
  .then(promises => Promise.all(promises))
  .then(() => quit())
  .catch(err => quit(err))
