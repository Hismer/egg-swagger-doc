'use strict';

const path = require('path');
const staticCache = require('koa-static-cache');
const { documentInit, getFuncBundler } = require('../document/index');
const { convertControllerPath } = require('./util');

module.exports = {
  /**
   * 注册SwaggerUI基础路由
   */
  basicRouterRegister: app => {
    const { basePath } = app.config.swaggerdoc;
    // swaggerUI json字符串访问地址
    app.get(`${basePath}/swagger.json`, ctx => {
      ctx.response.status = 200;
      ctx.response.type = 'application/json';
      ctx.response.body = documentInit(app);
    });
    app.logger.info(`[egg-doc] register router: get ${basePath}/swagger.json`);
    // swaggerUI的静态资源加入缓存，配置访问路由
    const swaggerH5 = path.join(__dirname, '../../app/public');
    app.use(staticCache(swaggerH5, { prefix: basePath }, {}));
    app.logger.info(`[egg-doc] register router: get ${basePath}/index.html`);
  },

  /**
   * 注册扫描到的路由
   */
  RouterRegister: app => {
    const funcBundler = getFuncBundler(app);
    const { router, controller } = app;
    for (let obj of funcBundler) {
      let instance = require(obj.filePath);
      let fileExtname = path.extname(obj.filePath);
      let direct = obj.filePath
        .split(fileExtname)[0]
        .split('app' + path.sep)[1];

      if (fileExtname === '.ts') {
        instance = instance.default;
      }

      for (let req of obj.routers) {
        if (instance.prototype) {
          const control = convertControllerPath(
            instance.prototype.pathName,
            controller
          );
          router[req.method](
            req.route.replace('{', ':').replace('}', ''),
            control[req.func]
          );
        } else {
          router[req.method](
            req.route.replace('{', ':').replace('}', ''),
            instance[req.func]
          );
        }
        app.logger.info(
          `[egg-swagger-doc] register router: ${req.method} ${
            req.route
          } for ${direct.replace(path.sep, '-')}-${req.func} `
        );
      }
    }
  },
};
