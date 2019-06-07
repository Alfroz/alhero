import '@fortawesome/fontawesome-free/css/all.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

/*  https://www.npmjs.com/package/lru-cache
var LRU = require("lru-cache")
const themeCache = new LRU({
  max: 10,
  maxAge: 1000 * 60 * 60 // 1 hour
})
*/

Vue.use(Vuetify, {
  iconfont: 'fa',
  theme: {
    primary: "#009688", // teal
    secondary: "#e91e63", //pink
    accent: "#303b3f", // custom
    error: "#AD1457", // pink darken-3
    warning: "#FF6F00", // amber darken 4
    info: "#3F51B5", // indigo
    success: "#558B2F" // light-green darken-2
  },
  options: {
    minifyTheme: function (css) {
      return process.env.NODE_ENV === 'production'
        ? css.replace(/[\s|\r\n|\r|\n]/g, '')
        : css
    },
    //themeCache
  }
})
