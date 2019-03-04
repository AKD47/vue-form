import Vue from 'vue'
import Router from 'vue-router'

// Dashboard Components
import products from '../views/products'
import taskManagment from '../views/task-managment'
import users from '../views/users'

// Sample Pages
import error404 from '../views/sample-pages/error-404'
import error500 from '../views/sample-pages/error-500'
import login from '../views/sample-pages/login'
import register from '../views/sample-pages/register'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [{
    path: '/',
    name: 'products',
    component: products
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
  },
      {
          path: '/task-managment',
          name: 'task-managment',
          component: taskManagment
      },
      {
          path: '/users',
          name: 'users',
          component: users
      }
  ]
})
