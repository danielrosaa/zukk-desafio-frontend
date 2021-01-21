import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import store from "@/store/auth"

Vue.use(VueRouter)


const ifAuthenticated = (to, from, next) => {
	const isAuth = localStorage.getItem("user-token") || store.state.isAuth
	if (isAuth) {
		next()
		return
	}
	next("/login")
}

const routes = [
	{
		path: "/login",
		name: "Login",
		component: Login,
	},
	{
		path: "/",
		name: "Listar",
		component: () => import("../views/ListarUsuarios.vue"),
		beforeEnter: ifAuthenticated,
	},
	{
		path: "/cadastrar",
		name: "Cadastrar",
		component: () => import("../views/Cadastrar.vue"),
		beforeEnter: ifAuthenticated,
	},
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
