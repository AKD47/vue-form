import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Login from './views/Login.vue';
import Users from './views/Users';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
	{
		path: '/login',
		component: Login
	},
	{
		path: '/',
		component: Home,
		meta: {
			requiresAuth: true
		}
	},
	  {
	  	path: '/users',
		component: Users,
		meta: {
	  		requiresAuth: true
		}
	  }
  ]
});

export default router;

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!localStorage.getItem('token')) {
			next({
				path: '/login',
				query: { redirect: to.fullPath }
			});
		} else {
			next();
		}	
	} else {
		next();
	}
});