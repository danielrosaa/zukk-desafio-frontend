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
		key: "AIzaSyCpUXESYtjAm-XUttwTl0e27tBH1uE9_ZI",
		libraries: 'places, geometry',
		language: "pt",
	},
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
