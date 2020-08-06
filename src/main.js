import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/scss/app.scss'
import * as moment from 'moment/moment.js'
import VueMoment from 'vue-moment'

Vue.use(VueMoment, { moment })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
