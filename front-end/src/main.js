import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import ElementsUI from 'element-ui'
import { Loading } from 'element-ui'
import { Notification } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDataTables from 'vue-data-tables'
import { Line } from 'vue-chartjs'

Vue.use(BootstrapVue)
Vue.use(ElementsUI, Loading)
Vue.use(VueDataTables)
Vue.use(Line)

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
