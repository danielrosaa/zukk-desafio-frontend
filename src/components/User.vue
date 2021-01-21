<template>
  <div class="user" :class="alterado && 'alterado'">
    <div>
      {{ user.name }}
    </div>
    <div>
      {{ user.phone }}
    </div>
    <div>
      {{ user.email }}
    </div>
    <div>
      {{ user.address }}
    </div>
    <div>
      {{ user.city }}
    </div>
    <div>
      {{ user.state }}
    </div>
    <div class="actions">
      <button @click="showEdit = true" class="info fab">
        <q-icon name="edit" />
      </button>
      <button @click="removeUser(user.id)" class="danger fab">
        <q-icon name="delete" />
      </button>
    </div>
    <transition name="fade">
      <div v-if="showEdit" class="modal">
        <div>
          <form>
            <div @click="showEdit = false" class="fechar">
              <q-icon name="close" />
            </div>
            <h4>Atualizar usuário</h4>
            <transition name="fade">
              <div v-if="error" class="error">
                Todos os campos são necessários
              </div>
            </transition>
            <label for="nome">Nome</label>
            <input v-model="alteracoes.name" type="text" id="nome"/>
            <label for="tel">Telefone</label>
            <input v-model="alteracoes.phone" type="text" id="tel" />
            <label for="tel">Email</label>
            <input v-model="alteracoes.email" type="text" id="email" />
            <label for="tel">Endereço</label>
            <input v-model="alteracoes.address" type="text" id="endereco" />
            <label for="tel">Bairro</label>
            <input v-model="alteracoes.county" type="text" id="bairro" />
            <label for="tel">Cidade</label>
            <input v-model="alteracoes.city" type="text" id="cidade" />
            <label for="tel">Estado</label>
            <input v-model="alteracoes.state" type="text" id="estado" />
            <label for="tel">CEP</label>
            <input v-model="alteracoes.zipcode" type="text" id="cep" />
            <button
              @click.prevent="editUser(alteracoes, user.id)"
              class="button"
            >
              Alterar
            </button>
          </form>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ["user"],
  data() {
    return {
      showEdit: false,
      alteracoes: {
        ...this.user
      },
      alterado: false,
      error: false
    };
  },
  methods: {
    removeUser(id) {
      this.remove = true;
      this.$store.dispatch("users/removeUser", id);
    },
    editUser(update, id) {
      if (this.nome !== "" && this.tel !== "") {
        this.$store.dispatch("users/editUser", [update, id]);
        this.showEdit = false;
        this.alterado = true;
        this.error = false;
        setTimeout(() => {
          this.alterado = false;
        }, 1500);
        // 1500 é o tempo da duração da animação
      } else {
        this.error = true;
      }
    }
  },
  mounted() {
    this.nome = this.user.name;
    this.tel = this.user.phone;
  }
};
</script>

<style lang="scss" scoped>
.user {
  height: 50px;
  display: inline-flex;
  align-items: center;
  width: 100%;
  text-align: left;
  border-bottom: 1px solid lightgray;
  transition: all 300ms;
  &:hover {
    background: #eee;
  }
  div {
    flex: 2;
    // margin-right: 30px;
    &.actions {
      flex: 1;
      text-align: right;
      button:first-child {
        margin-right: 10px;
      }
    }
  }
  &.alterado {
    animation: bounce 1.5s;
  }
}

.modal {
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  position: fixed;
  left: 0;
  top: 0;
  div {
    position: relative;
    margin: 0 auto;
    width: 50%;
    background: $gradient;
    padding: 30px;
    border-radius: 20px;
    form {
      display: grid;
    }

  }

  input,
  label {
    margin-bottom: 10px;
  }
  button,
  label {
    margin-top: 10px;
    color: white;
  }
  .fechar {
    background: transparent;
    margin: 0;
    width: auto;
    text-align: right;
    position: absolute;
    right: 10px;
    transform: translateY(-20px);
    cursor: pointer;
  }
}

@keyframes bounce {
  50% {
    background: lighten($color: lightgreen, $amount: 20);
  }
}
</style>
