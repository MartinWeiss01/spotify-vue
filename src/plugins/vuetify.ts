import '@mdi/font/css/materialdesignicons.min.css'
import 'vuetify/styles'
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

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
          spotify: '#1DB954',
        }
      }
    }
  },
  components: {
    VSkeletonLoader
  }
})