const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess.withLoaderOptions({
    modifyVars: { 
      "@primary-color": "#FF6600",
      "@font-family": "Microsoft YaHei",
      "@font-size-base": '14px',
      "@border-radius-base": '0',
      "@btn-border-radius-base": '0',
      "@btn-font-weight": '100'
   },
  })(config, env);
  return config;
};
