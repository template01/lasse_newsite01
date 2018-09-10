module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'LASSE CHRISTENSEN: FULL SPECTRUM DIGITAL DESIGNER',
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
        href: '/icon.png'
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
        src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'
      },{
        src:'https://cdn.polyfill.io/v2/polyfill.min.js'
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
  loading: false,
  loadingIndicator: '~/static/initloaderspa.html',

  // loading: {
  //   color: '#3B8070'
  // },
  modules: [
    // Simple usage
    ['nuxt-mq', {
      breakpoints: {
        sm: 450,
        md: 1024,
        lg: Infinity,
      }
    }]
  ],

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
