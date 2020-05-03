const { override, addLessLoader, addDecoratorsLegacy,fixBabelImports } = require('customize-cra');
module.exports = override(
	addLessLoader({
		javascriptEnabled: true,
    }),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
  }),
)