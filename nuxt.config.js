require('dotenv').config()
const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

module.exports = {
  env: {
    appName: process.env.APP_NAME,
    baseUrl: process.env.BASE_URL,
    baseApiUrl: process.env.API_BASE_URL,
    tokenName: 'satellizer_token',
    sessionName: 'member'
  },
  
  /*
  ** Router configuration
  */
  router: {
    extendRoutes (routes, resolve) {
      routes.push({
        name: 'single', 
        path: '/verb/:verb', 
        component: resolve(__dirname, 'pages/index.vue')
      })
    },
    scrollBehavior: async (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      const findEl = async (hash, x) => {
        return document.querySelector(hash) ||
          new Promise((resolve, reject) => {
            if (x > 50) {
              return resolve()
            }
            setTimeout(() => { resolve(findEl(hash, ++x || 1)) }, 100)
          })
      }

      if (to.hash) {
        let el = await findEl(to.hash)
        if ('scrollBehavior' in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
        } else {
          return window.scrollTo(0, el.offsetTop)
        }
      }

      return { x: 0, y: 0 }
    }
  },
  
  //mode: 'universal',
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
      
    ],
    script: [
      
    ] 
  },

  
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#E67225', throttle: 0 },

  /*
  ** Global CSS
  */
  css: [        
    '@/assets/css/app.scss',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-validate'
  ],
  
  plugins: [
    { src: '~/plugins/buefy.js', ssr: false },  
    { src: '~/plugins/cookie.js', ssr: false }, 
  ],
  
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: process.env.API_BASE_URL
    // See https://github.com/nuxt-community/axios-module#options
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'authenticate', method: 'post', propertyName: 'token' },
          user: { url: 'me', method: 'get', propertyName: 'member' },
          logout: false
        }
      }
    }
  },
  generate: {
    fallback: true, // if you want to use '404.html'
    fallback: '400.html' // if your hosting needs a custom location
  },
  build: {
    vendor: [
      'babel-polyfill',
      'vue-tables-2'
    ],
    cssSourceMap: false,
     extend (config) {
      config.devtool = false

    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && process.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          //loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
    
  }
}
