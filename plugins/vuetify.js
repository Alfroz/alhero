import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: "#009688", // teal
    secondary: "#e91e63", //pink
    accent: "#303b3f", // blue-grey darken 3
    error: "#AD1457", // pink darken-3
    warning: "#FF6F00", // amber darken 4
    info: "#3F51B5", // cyan darken-3
    success: "#558B2F" // light-green darken-2
  }
})
