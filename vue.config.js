module.exports = {
	chainWebpack: config => {
		config
			.plugin("html")
			.tap(args => {
				if (process.env.DEMO) {
					args[0].template = "./index.html"
				}
				return args
			})
	}
}