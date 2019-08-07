#!/usr/bin/env node

'use strict'

const fs = require('fs-extra')

const arg = process.argv[2] || '.'

const TEMPLATE = `${ __dirname }/template`
const TARGET = `${ process.cwd() }/${ arg }`

const run = async () => {
  try {
    await fs.copy(TEMPLATE, TARGET)
    await fs.move(`${ TARGET }/gitignore`, `${ TARGET }/.gitignore`)
  } catch (error) {
    console.log(error)
  }
}

run()
