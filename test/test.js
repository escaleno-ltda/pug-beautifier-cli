const assert = require('assert')
const fs = require('fs')
const cp = require('child_process')
const pkg = require('../package.json')
const beautifier = pkg.bin['pug-beautifier']
// test jade files
const beforeJade1 = 'test/before/test1.jade'
const beforeJade2 = 'test/before/test2.jade'
const trueFalse4Jade = 'test/after/test_true_false_4.jade'
const falseTrue2Jade = 'test/after/test_false_true_2.jade'

describe('Option test', () => {
  it('-h should work.', (done) => {
    cp.execFile(beautifier, ['-h'], (err, stdout, stderr) => {
      assert.ifError(err)
      done()
    })
  })
  it('-V should work.', (done) => {
    cp.execFile(beautifier, ['-V'], (err, stdout, stderr) => {
      assert.ifError(err)
      assert.equal(pkg.version, stdout.trim())
      done()
    })
  })
  it('When no tabsize, -s should throw error.', (done) => {
    cp.execFile(beautifier, ['-s', beforeJade1], (err, stdout, stderr) => {
      assert.ok(err)
      done()
    })
  })
})

describe('File test', () => {
  it('Default(filltab=false,omitdiv=true,tabsize=2) should work.', (done) => {
    cp.execFile(beautifier, [beforeJade1], (err, stdout, stderr) => {
      assert.ifError(err)
      fs.readFile(beforeJade1, 'utf8', (err, code1) => {
        assert.ifError(err)
        fs.readFile(falseTrue2Jade, 'utf8', (err, code2) => {
          assert.ifError(err)
          assert.equal(code1.trim(), code2.trim())
          done()
        })
      })
    })
  })

  it('Filltab=false,omitdiv=true,tabsize=2 should work.', (done) => {
    cp.execFile(beautifier, ['-t', '4', '-d', beforeJade2], (err, stdout, stderr) => {
      assert.ifError(err)
      fs.readFile(beforeJade2, 'utf8', (err, code1) => {
        assert.ifError(err)
        fs.readFile(trueFalse4Jade, 'utf8', (err, code2) => {
          assert.ifError(err)
          assert.equal(code1.trim(), code2.trim())
          done()
        })
      })
    })
  })
})
