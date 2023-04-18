import '@mdi/font/css/materialdesignicons.min.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1DB954',
          secondary: '#191414',
          background: '#1a1a1a',
          "on-primary": '#000000',
        }
      }
    }
  }
})