import { Axios } from "@/boot/axios"
const usersBaseUrl = "https://5f175a987c06c900160dc027.mockapi.io/api/v1/"

export async function loadUsers({ commit }) {
	try {
		const { data } = await Axios.get(usersBaseUrl + "users")
		commit("saveUsers", data.reverse())
	} catch (e) {
		console.error("Erro ao buscar usuários", e)
	}
}

export async function addUser(context, payload) {
	try {
		const { data } = await Axios.post(usersBaseUrl + "users", {
			name: payload.name,
			phone: payload.phone,
		})
		context.commit("saveUsers", [data, ...context.getters.users])
	} catch (e) {
		console.error("Erro ao adicionar usuário", e)
	}
}

export function removeUser(context, payload) {
	try {
		Axios.delete(`${usersBaseUrl}/users/${payload}`)
		context.getters.users.forEach((el, index) => {
			if (el.id === payload) {
				context.getters.users.splice(index, 1)
			}
		})
		context.commit("saveUsers", context.getters.users)
	} catch (e) {
		console.error("Erro ao deletar usuário", e)
	}
}

export function editUser(context, payload) {
	const id = payload[1],
		update = payload[0]
	try {
		Axios.put(`${usersBaseUrl}/users/${id}`, {
			name: update.nome,
			phone: update.tel,
		})
		context.getters.users.forEach(el => {
			if (el.id === id) {
				el.name = update.nome
				el.phone = update.tel
			}
		})
		context.commit("saveUsers", context.getters.users)
	} catch (e) {
		console.error("Erro ao atualizar usuário", e)
	}
}
