<template>
	<div class="login">
		<form class="form" @submit.prevent="onSubmit">
			<div class="form__title">
				<div>Login</div>
			</div>
			<div class="form__item">
				<div>
					<input class="form__input" v-model="identifier" type="text" placeholder="Digite seu usuário" />
				</div>
			</div>
			<div class="form__item">
				<div>
					<input class="form__input" v-model="password" type="password" placeholder="Digite sua senha" />
				</div>
			</div>
			<div class="form__item">
				<button class="button" type="submit" :disabled="autenticando">
					<span v-if="!autenticando">Enviar</span>
					<q-spinner-hourglass v-else size="1.2rem"/>
				</button>
			</div>
			<div>
				<p class="form__item">
					<em class="form__aviso">
						A API de autenticação é hospedada em um plano básico no Heroku, portanto, após algum tempo de inatividade, o servidor "dorme" e pode demorar um pouco para responder. É esperado que o seu login leve mais tempo para ser efetuado. Obrigado pela compreensão.
					</em>
				</p>
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
				.then(() => {
					this.$q.notify({
            type: "positive",
            message: "Usuário logado com sucesso",
						position: 'top'
          });
					this.autenticando = false
					this.$router.push("/")
				})
				.catch(err => {
					this.autenticando = false
					this.$q.notify({
            type: "negative",
            message: "Ocorreu um erro ao tentar logar. Por favor, verifique seu login e senha.",
						position: 'top'
          });
					console.log(err)
				})
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	height: 100%; // of main-container
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-image: $gradient;

	@media screen and (max-width: 801px) {
		.form {
			width: 90%;
			padding: 10px 15px;
		}
	}
}


</style>
