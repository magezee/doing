const { override, addLessLoader, addDecoratorsLegacy } = require('customize-cra');
module.exports = override(
	addLessLoader({
		javascriptEnabled: true,
    }),
    addDecoratorsLegacy()
)