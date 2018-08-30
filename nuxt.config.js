module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'nuxt-bulma',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css'
      },
      {
        rel: 'stylesheet',
        href: '/fonts/panamera/stylesheet.css'
      }
    ],
    script: [{
      src: "/js/Pong/build/Pong.js"
    }]
  },
  modules: [
    // provide path to the file with resources
    ['nuxt-sass-resources-loader', './assets/main.scss']
  ],
  plugins: [{
    src: '~/plugins/smoothscroll.js',
    ssr: false
  }, ],

  css: [
    // { src: 'bulma/bulma.sass', lang: 'sass' },
    {
      src: '~/assets/browsermockup.css',
      lang: 'css'
    },
    {
      src: '~/assets/main.scss',
      lang: 'scss'
    },
  ],
  /*
   ** Customize the progress bar color
   */
  mode: 'spa',
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
