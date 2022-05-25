import { createRouter, createWebHashHistory } from 'vue-router'
import auth from '../firebase/auth'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/budgetary',
    name: 'BudgetaryList',
    component: () => import('../views/BudgetaryList.vue')
  },
  {
    path: '/budgetary/:url',
    name: 'Budgetary',
    props: true,
    component: () => import('../views/BudgetaryDisplay.vue')
  },
  {
    path: '/sample',
    name: 'Sample',
    component: () => import('../views/EqualSample.vue')
  },
  {
    path: '/core/:url',
    name: 'Core',
    props: true,
    
    component: () => import('../views/Core.vue')
  },
  {
    path: '/core/:url/:panel_url',
    name: 'CorePanel',
    props: true,
    component: () => import('../views/CorePanel.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


if (window.location.hostname !== 'localhost') {
router.beforeEach((to, _, next) =>{
  if (to.name !== 'Login' && !auth.loggedIn) next({ name: 'Login' })
  else{
  next()
  }
})
}     
export default router
