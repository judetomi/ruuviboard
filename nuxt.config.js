const pkg = require('./package')

export default {
	mode: 'spa',
	/*
   ** Headers of the page
   */
	head: {
		title: pkg.name,
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: pkg.description }
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				rel: 'stylesheet',
				href: 'https://fonts.googleapis.com/css?family=Cousine:400,500,500'
			},
			{
				rel: 'stylesheet',
				type: 'text/css',
				href:
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
			},
			{
				rel: 'stylesheet',
				type: 'text/css',
				href:
          'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
			}
		],
		script: [
			{ src: 'https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js' },
			{ src: 'js/shards.min.js', type: 'text/javascript' }
		]
	},
	/*
   ** Customize the progress-bar color
   */
	loading: { color: '#fff' },
	/*
   ** Global CSS
   */
	css: [
		'@/assets/css/shards.min.css',
		'@/assets/css/main.css'
	],
	/*
   ** Plugins to load before mounting the App
   */
	plugins: [],
	/*
   ** Nuxt.js modules
   */
	modules: [
		// Doc: https://bootstrap-vue.js.org/docs/
		'bootstrap-vue/nuxt',
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/eslint-module'
	],
	/*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
	axios: {},
	/*
   ** Build configuration
   */
	build: {
		/*
     ** You can extend webpack config here
     */
		extend(config, ctx) {
			// Run ESLint on save
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				})
			}
		}
	},
	serverMiddleware: [
		// API middleware
		'~/server/api/index.js'
	]
}
