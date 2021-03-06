import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": require('../Index').default,
    "routes": [
      {
        "path": "/",
        "component": require('../api-detail/ApiDetail').default,
        "exact": true,
        "_title": "Swagger UI Theme",
        "_title_default": "Swagger UI Theme"
      },
      {
        "path": "/:tagKey/:apiKey",
        "component": require('../api-detail/ApiDetail').default,
        "exact": true,
        "_title": "Swagger UI Theme",
        "_title_default": "Swagger UI Theme"
      },
      {
        "path": "/:type/:url/:tagKey/:apiKey",
        "component": require('../api-detail/ApiDetail').default,
        "exact": true,
        "_title": "Swagger UI Theme",
        "_title_default": "Swagger UI Theme"
      },
      {
        "path": "/blank/:type/:url/:tagKey/:apiKey",
        "component": require('../BlankUI').default,
        "exact": true,
        "_title": "Swagger UI Theme",
        "_title_default": "Swagger UI Theme"
      },
      {
        "component": () => React.createElement(require('/Users/oday/Developer/Code/github/egg-swagger-doc/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
        "_title": "Swagger UI Theme",
        "_title_default": "Swagger UI Theme"
      }
    ],
    "_title": "Swagger UI Theme",
    "_title_default": "Swagger UI Theme"
  },
  {
    "component": () => React.createElement(require('/Users/oday/Developer/Code/github/egg-swagger-doc/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: true }),
    "_title": "Swagger UI Theme",
    "_title_default": "Swagger UI Theme"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
