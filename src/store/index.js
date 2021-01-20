import Vue from "vue"
import Vuex from "vuex"
import auth from "./auth"
import users from "./users"

Vue.use(Vuex)

export default function() {
	const Store = new Vuex.Store({
		modules: {
			auth,
			users
		}
	})

	return Store
}
