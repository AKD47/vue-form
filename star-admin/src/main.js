import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
// import { ClientTable } from 'vue-tables-2'
import ElementsUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDataTables from 'vue-data-tables'

Vue.use(BootstrapVue)
// Vue.use(ClientTable)
Vue.use(ElementsUI)
Vue.use(VueDataTables)

// set language to EN
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.config.productionTip = false
global.Host = 'https://backendzenabi.dimatech.org'

new Vue({
  router,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
