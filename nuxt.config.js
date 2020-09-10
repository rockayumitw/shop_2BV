const webpack = require('webpack')
module.exports = {
  mode: 'universal',
  env: {
    // title: process.env.npm_package_name || ''
    // baseUrl: process.env.BASE_URL || 'http://localhost:3000',

  },
  /*
  ** Headers of the page
  */
  // router:{
    // base:"/www" // generate router
  // },
  head: {
    // title: process.env.npm_package_name || '',
    title: 'title',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  axios: {
    credentials: true,
    init(axios) {
      axios.defaults.withCredentials = true
    }
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src:'~assets/scss/app.css'}
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~plugins/main', ssr: false },
    { src: '~plugins/i18n'},
    { src: "~plugins/aos", ssr: false },
    { src: '~plugins/http', ssr: false},
    { src: '~plugins/vee-validate', ssr: true },
    { src: '~plugins/filter', ssr:false}
  // { src: '~/plugins/mixins/header', ssr: false}
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    'vue-sweetalert2/nuxt',
    'nuxt-fontawesome',
    'vue-social-sharing/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true,
    prefix: '/api',
    credentials: true
  },
  proxy: {
    '/api/':{
      target: 'https://vue-course-api.hexschool.io/',
      changeOrigin: true,
      pathRewrite:{
        '^/api': '/',
      },
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
   transpile: ['TweenMax', 'TimelineMax','vee-validate/dist/rules'],
    extend (config, ctx) {
    },
    vendor: ['aos'],
    plugins:[
      new webpack.ProvidePlugin({
        '$': 'jquery',
        jQuery:'jquery',
        moment:'moment'
      })
    ]
  },
  fontawesome: {
    // icon 的標籤使用 <fa>，這邊不設定就會依照 plugin 裡的設定<font-awesome-icon>
    component: 'fa',
    imports: [
      // 引入 fas 所有的icon
      {
        set: '@fortawesome/free-solid-svg-icons',
        icons: ['fas']
      },
      {
        set:'@fortawesome/free-regular-svg-icons',
        icons:['far']
      },
      {
        set:'@fortawesome/free-brands-svg-icons',
        icons:['fab']
      },
    ]
  }
}
