import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'
import 'normalize.css'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

createApp(App).use(router).use(PrimeVue, { ripple: true }).mount('#app')