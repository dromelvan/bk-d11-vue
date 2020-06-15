import Vue from 'vue'
import Vuetify from 'vuetify/lib'
// import light from './theme'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    // dark: true,
    themes: {
      light: {
        primary: '#000A3C',
        secondary: colors.red,
        accent: colors.shades.black,
        error: colors.red.accent3
      },
      dark: {
        primary: '#000A3C',
        secondary: colors.red
      }
    }
  }
})
