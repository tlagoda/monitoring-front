import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

loadFonts()

createApp(App).use(router).use(vuetify).mount('#app')