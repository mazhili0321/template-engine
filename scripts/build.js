#!/usr/bin/env node

const { buildTask } = require('./buildTask.js')
const { data } = require('../config/data.config.js')

Promise.allSettled(data.map(buildTask)).then(results => {
  let hasError = results.some(result => result.status !== 'fulfilled')
  let responseText = JSON.stringify(results)
  if (hasError) {
    console.error(responseText)
    process.exit(1)
  } else {
    console.log(responseText)
    process.exit(0)
  }
})