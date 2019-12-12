#!/usr/bin/env node

const http = require('http')
const express = require('express')
const { data } = require('../config/data.config.js')

const { buildTask } = require('./buildTask')
const app = express()
http.createServer({}, app).listen({ port: 8080, host: '0.0.0.0' }, () => {
  console.log('Server listening at http://127.0.0.1:8080/')
})

app.get('/build', (req, res) => {
  Promise.allSettled(data.map(buildTask)).then(results => {
    let hasError = results.some(result => result.status !== 'fulfilled')
    res.status(hasError ? 500 : 200).send(JSON.stringify(results))
  })
})

// 以下为测试mock接口
app.get('/searchData', (req, res) => {
  let users = [
    { name: '张三' },
    { name: '李四' },
    { name: '王五' },
  ]
  res.status(200).send(users)
})