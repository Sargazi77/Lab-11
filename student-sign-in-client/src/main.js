import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'

import studentAPIService from '@/services/StudentServices'

Vue.use(BootstrapVue)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.config.productionTip = false

Vue.prototype.$student_api = studentAPIService
new Vue({
  render: h => h(App),
}).$mount('#app')
