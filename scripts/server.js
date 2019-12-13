#!/usr/bin/env node

const http = require('http')
const express = require('express')
const { data } = require('../config/data.config.js')

const { buildTask } = require('./buildTask')
const app = express()
http.createServer({}, app).listen({ port: 8080, host: '0.0.0.0' }, () => {
  console.log('Server listening at http://127.0.0.1:8080/')
})

// 执行构建任务
app.get('/build', (req, res) => {
  Promise.allSettled(data.map(buildTask)).then(results => {
    let hasError = results.some(result => result.status !== 'fulfilled')
    res.status(hasError ? 500 : 200).send(JSON.stringify(results))
  })
})

/**
 * 以下为路由信息
 */

/**
 * 以下为测试mock接口
 */
app.get('/getData', (req, res) => {
  let data = [
    {
      id: '1',
      name: '产品介绍',
      content: '',
      children: [
        {
          id: '1-1',
          name: '什么是云容器引擎',
          content: '<h1>这里是正文"jnibn"内容</h1><h2>这里是正文内容</h2><h3>这里是正文内容</h3><h4>这里是正文内容</h4><h5>这里是正文内容</h5><h6>这里是正文内容</h6>',
          children: []
        },
        {
          id: '1-2',
          name: '容器全栈产品',
          content: '<p>这里是正文内容</p>',
          children: []
        },
        {
          id: '1-3',
          name: '产品优势',
          content: '<p>这里是正文内容</p>',
          children: []
        },
        {
          id: '1-4',
          name: '应用场景',
          content: '<p>这里是正文内容</p>',
          children: []
        },
        {
          id: '1-5',
          name: '基本概念',
          content: '<p>这里是正文内容</p>',
          children: []
        },
        {
          id: '1-6',
          name: '与其它云服务关系',
          content: '',
          children: [
            {
              id: '1-6-1',
              name: '什么是云容器引擎',
              content: '<p>这里是正文内容</p>',
              children: []
            },
            {
              id: '1-6-2',
              name: '容器全栈产品',
              content: '<p>这里是正文内容</p>',
              children: []
            },
          ]
        },
      ]
    },
    {
      id: '2',
      name: '价格说明',
      content: '<h1>这里是正文"jnibn"内容</h1><h2>这里是正文内容</h2><h3>这里是正文内容</h3><h4>这里是正文内容</h4><h5>这里是正文内容</h5><h6>这里是正文内容</h6>',
      children: []
    },
    {
      id: '3',
      name: '快速入门',
      content: '',
      children: []
    },
    {
      id: '4',
      name: '控制台指南',
      content: '',
      children: []
    },
    {
      id: '5',
      name: '工具指南',
      content: '',
      children: []
    },
    {
      id: '6',
      name: '特性指南',
      content: '',
      children: []
    },
    {
      id: '7',
      name: '最佳实践',
      content: '',
      children: []
    },
    {
      id: '8',
      name: '开发指南',
      content: '',
      children: []
    },
    {
      id: '9',
      name: 'API参考',
      content: '',
      children: []
    },
    {
      id: '10',
      name: 'SDK参考',
      content: '',
      children: []
    },
    {
      id: '11',
      name: '常见问题',
      content: '',
      children: []
    },
  ]
  res.status(200).send(data)
})