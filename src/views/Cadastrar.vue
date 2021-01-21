<template>
	<div class="cadastrar">
		<div class="titulo">Adicionar usuário</div>
		<transition name="fade">
			<div v-if="error" class="error">
				Todos os campos são necessários
			</div>
		</transition>
		<form class="form">
			<div class="dados q-gutter-md">
        <div class="row justify-between">
          <div class="form__item col-5">
            <label class="form__label" for="nome">Nome</label>
            <input class="form__input" v-model="nome" type="text" id="nome" />
          </div>
          <div class="form__item">
            <label class="form__label" for="tel">Telefone</label>
            <input class="form__input" v-model="telefone" type="text" id="tel" />
          </div>
          <div class="form__item">
            <label class="form__label" for="tel">Email</label>
            <input class="form__input" v-model="email" type="text" id="tel" />
          </div>
        </div>
				<div class="form__item">
					<label class="form__label" for="tel">Endereço</label>
				</div>
				<div class="form__item">
					<input class="form__input" v-model="endereco" type="text" id="tel" />
				</div>
        <div class="row justify-between">
          <div class="form__item col-5">
            <label class="form__label" for="tel">Bairro</label>
            <input class="form__input" v-model="bairro" type="text" id="tel" />
          </div>
          <div class="form__item col-5">
            <label class="form__label" for="tel">Cidade</label>
            <input class="form__input" v-model="cidade" type="text" id="tel" />
          </div>
          <div class="form__item col-1">
            <label class="form__label" for="tel">UF</label>
            <input class="form__input" v-model="uf" type="text" id="tel" />
          </div>
        </div>
        <br/>
				<button @click.prevent="addUser" class="button">Adicionar</button>
			</div>
			<div class="mapa">
				<div>Mapa aqui</div>
			</div>
		</form>
	</div>
</template>

<script>
export default {
	data() {
		return {
			nome: "",
			telefone: "",
			email: "",
			endereco: "",
			bairro: "",
			cidade: "",
			uf: "",
		}
	},
	methods: {
		addUser() {
			const user = {
				name: this.nome,
				phone: this.tel,
			}
			if (this.nome !== "" && this.tel !== "") {
				this.$store.dispatch("users/addUser", user)
				this.resetForm()
				this.error = false
			} else {
				this.error = true
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.cadastrar {
	width: 960px;
	margin: 50px auto;
}

.titulo {
	font-size: 2rem;
	margin-bottom: 50px;
}

.dados {
}

.mapa {
  margin-top: 24px;
	border: 1px solid black;
}

.form {
	display: flex;
	flex-direction: column;
	width: 100%;
	background-image: $gradient;
	&__item {
		margin: 10px 0;
  }
  &__input {
    margin-top: 0;
  }
}
</style>
