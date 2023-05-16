// @ts-ignore
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: { primary: '#4169E1', secondary: '#FFFFFF' }
      }
    }
  }
})