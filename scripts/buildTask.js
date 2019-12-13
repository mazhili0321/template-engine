#!/usr/bin/env node

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const ejs = require('ejs')

const { readDir, writeDir } = require('../config/file.config.js')

// 调用接口 获取数据
function fetchData (dataUrl) {
  return axios.get(dataUrl).then((res) => {
    return { data: res.data }
  }).catch(err => {
    console.error(`获取数据失败：${err.msg}`)
  })
}

// 读取模板
function fetchTemplate (templatePath) {
  return new Promise((resolve, reject) => {
    return fs.readFile(path.join(readDir, templatePath), 'utf8', (err, data) => {
      if (err) {
        return reject(err)
      }
      resolve(data)
    })
  })
}

// 填充数据到模板, 渲染并生成html
function buildTask (task) {
  return Promise.all([fetchData(task.dataUrl), fetchTemplate(task.templatePath)]).then(([data, template]) => {
    let dirName = path.dirname(task.templatePath)
    let extName = path.extname(task.templatePath)
    let baseName = path.basename(task.templatePath, extName)
    // 生成的文件的路径
    let outputPath = path.join(dirName, baseName + '.html')
    // ejs渲染文件所在路径
    let fileName = path.join(writeDir, outputPath)
    // 渲染后的静态html字符串
    let content;
    try{
      content = ejs.render(template, data, { filename: fileName });
    }catch(err){
      console.log(err);
      throw err;
    }
    // 判断目录是否存在, 不存在则创建目录, 防止目录不存在报错
    let isExist = fs.existsSync(path.join(writeDir, dirName))
    if (!isExist) {
      fs.mkdirSync(path.join(writeDir, dirName))
    }
    // 选然后的html写入指定路径
    fs.writeFileSync(fileName, content, 'utf8')
    // 更改数据配置的成功标志
    task.status = 'fulfilled'
    return outputPath
  })
}

module.exports = {
  buildTask
}