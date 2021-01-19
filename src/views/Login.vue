<template>
	<div>
		<h1>Login</h1>
		<form id="form" ref="form" @submit.prevent="onSubmit">
			<div>
				<label for="user">Usuário</label>
				<div>
					<input v-model="identifier" type="text" />
				</div>
			</div>
			<div>
				<label for="password">Senha</label>
				<div>
					<input v-model="password" type="password" />
				</div>
			</div>
			<div>
				<button type="submit">Enviar</button>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			identifier: "",
			password: "",
			autenticando: false
		}
	},
	methods: {
		async onSubmit() {
			this.autenticando = true
			const { identifier, password } = this
			this.$store
				.dispatch("auth/request", { identifier, password })
				.then((response) => {
					console.log('login', response)
					this.autenticando = false
					// this.$router.push("/")
				})
				.catch(err => {
					this.autenticando = false
					console.log(err)
				})
		},
	},
}
</script>
