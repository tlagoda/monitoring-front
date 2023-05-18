import MyHome from './views/MyHome.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import SignUp from './views/SignUp.vue'
import SignIn from './views/SignIn.vue'
import AddPerformance from './views/AddPerformance.vue'

export const routes = [
  {
    path: '/',
    component: DefaultLayout,
    children: [
      {
        path: '',
        component: MyHome,
        name: 'home',
      },
    ],
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
  },
  {
    path: '/performances/add',
    name: 'addPerformance',
    component: AddPerformance
  }
]
