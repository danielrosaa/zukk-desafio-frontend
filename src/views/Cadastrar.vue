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
						<input class="form__input" v-model="user.nome" type="text" id="nome" />
					</div>
					<div class="form__item">
						<label class="form__label" for="tel">Telefone</label>
						<input
							class="form__input"
							v-model="user.telefone"
							type="text"
							id="tel"
						/>
					</div>
					<div class="form__item">
						<label class="form__label" for="tel">Email</label>
						<input class="form__input" v-model="user.email" type="text" />
					</div>
				</div>
        <div class="row justify-between">
          <div class="form__item col-10">
            <label class="form__label" for="tel">Endereço</label>
            <input class="form__input" v-model="user.endereco" type="text" disabled />
          </div>
          <div class="form__item col-1">
            <label class="form__label" for="tel">Número</label>
            <input class="form__input" v-model="user.numero" type="text" />
          </div>
        </div>
				<div class="row justify-between">
					<div class="form__item col-5">
						<label class="form__label" for="tel">Bairro</label>
						<input class="form__input" v-model="user.bairro" type="text" disabled/>
					</div>
					<div class="form__item col-5">
						<label class="form__label" for="tel">Cidade</label>
						<input class="form__input" v-model="user.cidade" type="text" disabled/>
					</div>
					<div class="form__item col-1">
						<label class="form__label" for="tel">UF</label>
						<input class="form__input" v-model="user.uf" type="text" disabled/>
					</div>
				</div>
				<div class="row">
					<div class="form__item col-3">
						<label class="form__label" for="tel">CEP</label>
						<input
							@blur="buscaCep"
							class="form__input"
							v-model="user.cep"
							type="text"
						/>
					</div>
				</div>
				<br />
				<button @click.prevent="addUser" class="button">Adicionar</button>
			</div>
			<div class="mapa">
				<GmapMap
					:center="{ lat: location.lat, lng: location.lng }"
					:zoom="15"
					map-type-id="terrain"
					style="width: 100%; height: 500px"
				>
					<GmapMarker
						:position="location"
						:clickable="true"
						:draggable="true"
					/>
				</GmapMap>
			</div>
		</form>
	</div>
</template>

<script>
import { gmapApi } from "vue2-google-maps"
export default {
	computed: {
		google: gmapApi,
	},
	data() {
		return {
      error: false,
      user: {
        nome: "",
        telefone: "",
        email: "",
        endereco: "",
        numero: '',
        bairro: "",
        cidade: "",
        uf: "",
        cep: "",
      },
			location: {
				lat: 0,
				lng: 0,
			},
		}
	},
	mounted() {
		const showPosition = position => {
			this.location = {
				lat: Number(position.coords.latitude),
				lng: Number(position.coords.longitude),
			}
		}
		navigator.geolocation.getCurrentPosition(showPosition)
	},
	methods: {
		addUser() {
			const user = {
				nome: this.user.nome,
        telefone: this.user.telefone,
        email: this.user.email,
        endereco: this.user.endereco + ', ' + this.user.numero,
        cidade: this.user.cidade,
        bairro: this.user.bairro,
        estado: this.user.uf,
        cep: this.user.cep,
      }
			if (this.nome !== "" && this.telefone !== "") {
				this.$store.dispatch("users/addUser", user)
				this.error = false
			} else {
				this.error = true
			}
		},
		async buscaCep() {
			// const { data } = await this.$axios.get(
			// 	`https://www.cepaberto.com/api/v3/cep?cep=${this.cep}`,
			// 	{
			// 		headers: {
			// 			Authorization: "Token token=b9775287f6c8b920f76c31f8a7a2292e",
			// 		},
			// 	}
      // )
      if (this.user.cep) {
        const { data } = await this.$axios.get(`https://viacep.com.br/ws/${this.user.cep}/json/`)
        this.user = {
          ...this.user,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          uf: data.uf,
          cep: this.user.cep
        }
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
	width: 100%;
	height: 500px;
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
    &:disabled {
      background: rgba(255, 255, 255, 0.99);
    }
	}
}
</style>
