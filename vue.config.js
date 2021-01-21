module.exports = {
	css: {
		loaderOptions: {
			scss: {
				additionalData: `
                @import "~@/assets/scss/main.scss";
                `,
			},
		},
	},

	pluginOptions: {
		quasar: {
			importStrategy: "kebab",
			rtlSupport: false,
		},
	},

	transpileDependencies: ["quasar"],
}
