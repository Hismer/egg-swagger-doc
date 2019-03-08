'use strict';
const { basicRouterRegister, RouterRegister } = require('./router/index');
const { documentInit } = require('./document/index');
const { getValidateRuler } = require('./contract/index');
const renderInit = require('./render');

module.exports.swaggerInit = app => {
  const { swaggerdoc } = app.config;

  // 初始化文档
  documentInit(app);

  // 生成validateRule
  getValidateRuler(app);

  // 如果允许展示swaggerUI，注册相应路由
  if (swaggerdoc.enable) {
    basicRouterRegister(app);
  }

  // 如果允许使用swaggerRouter，注册相应路由
  if (swaggerdoc.routerMap) {
    RouterRegister(app);
  }

  // 渲染器加载
  renderInit(app);
};
