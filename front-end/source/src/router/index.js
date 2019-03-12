/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Products page
import products from '../views/products'
import taskManagment from '../views/task-managment'
import usersManagment from '../views/users-managment'
// Widgets
import widgets from '../views/widgets'

// UI Components
import alerts from '../views/ui-components/alerts'
import badges from '../views/ui-components/badges'
import breadcrumbs from '../views/ui-components/breadcrumbs'
import buttons from '../views/ui-components/buttons'
import carousel from '../views/ui-components/carousel'
import dropdowns from '../views/ui-components/dropdowns'
import icons from '../views/ui-components/icons'
import modals from '../views/ui-components/modals'
import paginations from '../views/ui-components/paginations'
import progress from '../views/ui-components/progress'
import tables from '../views/ui-components/tables'
import typography from '../views/ui-components/typography'
import tabs from '../views/ui-components/tabs'
import tooltips from '../views/ui-components/tooltips'

// Form Components
import forms from '../views/forms/forms'

// Sample Pages
import error404 from '../views/sample-pages/error-404'
import error500 from '../views/sample-pages/error-500'
import login from '../views/sample-pages/login'
import register from '../views/sample-pages/register'
import users from '../views/users-managment'

Vue.use(Router)

export const router = new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'products',
      component: products
    },
    {
      path: '/task-managment',
      name: 'taskManagment',
      component: taskManagment
    },
    {
      path: '/users-managment',
      name: 'users-managment',
      component: usersManagment
    },
    {
      path: '/404',
      name: 'error-404',
      component: error404
    },
    {
      path: '/500',
      name: 'error-500',
      component: error500
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    }]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
