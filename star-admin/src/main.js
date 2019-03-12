import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

Vue.config.productionTip = false
global.Host = 'https://backendzenabi.dimatech.org'

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
