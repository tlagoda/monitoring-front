import Home from './views/Home.vue'
import SignUp from './views/SignUp.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
]
