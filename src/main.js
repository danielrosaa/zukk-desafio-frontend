import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './boot/axios'
import './boot/quasar'
import * as VueGoogleMap from 'vue2-google-maps'

Vue.config.productionTip = false
Vue.use(VueGoogleMap, {
	load: {
		key: process.env.VUE_APP_GMAPAPIKEY,
		libraries: 'places, geometry',
		language: "pt",
	},
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
