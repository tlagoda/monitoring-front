import MyHome from './views/MyHome.vue'
import SignUp from './views/SignUp.vue'

export const routes = [
  {
    path: '/',
    name: 'home',
    component: MyHome
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  }
]
