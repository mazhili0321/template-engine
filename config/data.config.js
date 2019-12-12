/**
 * 模板与接口地址配置信息
 * @param templatePath  模板所在路径
 * @param dataUrl       请求接口地址
 * @param status        渲染是否成功的状态, fulfilled 为成功
 */

module.exports = {
  data: [
    {
      templatePath: '/user/users.ejs',
      dataUrl: 'http://10.4.1.112:18603/am/v1/api/tenant?access_token=df063938-8f9f-44f4-8e6b-af5b33f1e432',
      status: ''
    }
  ]
}