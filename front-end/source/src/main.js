// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router  from './router'
import store from './store';
import BootstrapVue from 'bootstrap-vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { ClientTable } from 'vue-tables-2';

Vue.use(BootstrapVue)
Vue.use(ClientTable)
Vue.use(VueAxios, axios)


Vue.prototype.$https = axios;

const token = localStorage.getItem('user-token')
if (token) {
  Vue.prototype.$https.defaults.headers.common['Authorization'] = token
}

Vue.config.productionTip = false

global.Host = 'https://backendzenabi.dimatech.org'

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
