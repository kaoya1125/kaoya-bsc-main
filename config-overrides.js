const path = require('path');
const { fixBabelImports, override, addWebpackAlias, addLessLoader } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#d45d02',
        '@layout-footer-background': '#d45d02',
        '@layout-header-background': '#ffffff'
      }
    }
  }),
  addWebpackAlias({
    "@uniswap/sdk": path.resolve(__dirname, './node_modules/@sashimiswap/sdk'),
    "@uniswap/v2-periphery": path.resolve(__dirname, './node_modules/@sashimiswap/periphery'),
    "@uniswap/v2-core": path.resolve(__dirname, './node_modules/@sashimiswap/core')
  })
)
