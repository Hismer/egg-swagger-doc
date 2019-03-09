import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  ...((require('/Users/oday/Developer/Code/github/egg-swagger-doc/src/dva.js').config || (() => ({})))()),
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/Users/oday/Developer/Code/github/egg-swagger-doc/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'DocInfoModel', ...(require('/Users/oday/Developer/Code/github/egg-swagger-doc/src/models/DocInfoModel.js').default) });
app.model({ namespace: 'I18nModel', ...(require('/Users/oday/Developer/Code/github/egg-swagger-doc/src/models/I18nModel.js').default) });
app.model({ namespace: 'IndexModel', ...(require('/Users/oday/Developer/Code/github/egg-swagger-doc/src/models/IndexModel.js').default) });
