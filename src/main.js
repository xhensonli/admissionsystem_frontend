import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './global/global'

//bootstrap
import 'bootstrap'
import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


//element
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/element-variables.scss'

//v-charts
import VCharts from 'v-charts'


//style
import './assets/css/reset.css'
import './assets/css/index.css'


Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(global)
Vue.use(VCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
