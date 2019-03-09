'use strict';
const { extname, join } = require('path');
const fs = require('fs');

// 对外exports对象
const modules = {};

/**
 * 基础类型默认渲染
 */
const baseValueRenders = {
  integer(entity) {
    const value = entity[this.key];
    if (value === undefined) return undefined;
    return parseInt(entity[this.key]);
  },
  string(entity) {
    const value = entity[this.key];
    if (value === undefined) return undefined;
    return entity[this.key].toString();
  },
  boolean(entity) {
    const value = entity[this.key];
    if (value === undefined) return undefined;
    return Boolean(entity[this.key]);
  },
  number(entity) {
    const value = entity[this.key];
    if (value === undefined) return undefined;
    return Number(entity[this.key]);
  },
};

/**
 * 及联渲染方法
 * @param {*} entity 实体
 * @param {*} options 选项
 * @param {*} ignores 跳过
 * @return {*} 结果
 */
async function defaultEntityRender(entity, options, ignores) {
  const value = entity[this.key];
  if (value === undefined) return undefined;
  const type = modules[this.type];
  if (type) return await type(value, ignores, options);
  return undefined;
}

/**
 * 渲染实体
 * @param {*} entity 实体
 * @return {*} 结果
 */
async function render(entity, ...args) {
  // 解析参数
  let ignores = [];
  let options = {};
  if (args.length === 1) {
    if (args[0] instanceof Array) {
      ignores = args[0];
    } else {
      options = args[0];
    }
  } else if (args > 1) {
    ignores = args[0];
    options = args[0];
  }
  // 渲染结果
  const result = {};
  for (const key in this) {
    if (ignores.includes(key)) continue;
    const config = this[key];
    const value = config.render(entity, options, ignores);
    result[key] = value instanceof Promise ? await value : value;
  }
  return result;
}

/**
 * 递归获取定义的Contract
 * @param {String} baseDir 根目录
 * @param {String} directory 相对目录
 */
const loader = (baseDir, directory) => {
  const contractDir = join(baseDir, directory);

  const names = fs.readdirSync(contractDir);
  for (const name of names) {
    const filepath = join(contractDir, name);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      loader(contractDir, name);
      continue;
    }

    if (stat.isFile() && ['.js', '.ts'].indexOf(extname(filepath)) !== -1) {
      const def = require(filepath.split(/\.(js|ts)/)[0]);
      for (const object in def) {
        // 绑定值渲染方法
        for (const key in def[object]) {
          const config = def[object][key];
          config.key = key;
          // 已有渲染方法，绑定this
          if (config.render instanceof Function) {
            config.render = config.render.bind(config);
            continue;
          }
          // 获取基础类型渲染
          const render = baseValueRenders[config.type];
          if (render) {
            config.render = render.bind(config);
          } else {
            config.render = defaultEntityRender.bind(config);
          }
        }
        // 暴露实体渲染方法
        modules[object] = render.bind(def[object]);
      }
    }
  }
};

// 加载配置
module.exports = app => {
  const baseDir = join(app.config.baseDir, 'app/contract');
  if (!fs.existsSync(baseDir)) {
    app.logger.warn('[egg-doc] can not found contract in app`s directory');
  }
  loader(baseDir, '/');
  app.renders = modules;
};
