#!/usr/bin/env node

'use strict'

const fs = require('fs-extra')

const arg = process.argv[2] || '.'

const TEMPLATE = `${ __dirname }/template`
const TARGET = `${ process.cwd() }/${ arg }`

fs.copy(TEMPLATE, TARGET, error => {
  if (error) {
    console.log(error)
    return
  }

  fs.renameSync(`${ TO }/gitignore`, `${ TO }/.gitignore`)
})
