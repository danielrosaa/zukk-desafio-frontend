<template>
	<div class="main-container login">
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
				<button class="button" type="submit">Enviar</button>
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
					this.$router.push("/")
				})
				.catch(err => {
					this.autenticando = false
					console.log(err)
				})
		},
	},
}
</script>

<style lang="scss" scoped>
.login {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	background-image: linear-gradient(to top right, #635BC4, #82ABDE);

	.form {
		background: rgba($secondary, 0.07);
		width: 30%;
		border-radius: 20px;
		padding: 50px;
		display: grid;
		color: #FFF;
		&__title {
			font-size: 2rem;
			font-weight: 100;
			text-align: center;
		}
		&__item {
			margin: 30px 0;
		}
		&__input {
			outline: none;
			border: 0;
			border-radius: 5px;
			width: 100%;
			padding: 10px;
		}
	}

	.button {
		padding: 10px;
		border: 0;
		outline: none;
		background: $primary;
		color: #FFF;
		border-radius: 5px;
		box-shadow: 0px 3px 5px 2px rgba($secondary, 0.2);
		width: 100%;
		transition: all 300ms;
		&:hover {
			opacity: 0.9;
		}
		&:active {
			box-shadow: none;
		}
	}
}
</style>
