import MyHome from './views/MyHome.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'

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
  },
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  }
]
