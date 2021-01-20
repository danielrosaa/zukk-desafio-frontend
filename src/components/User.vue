<template>
  <div class="user" :class="alterado && 'alterado'">
    <div>
      {{ user.name }}
    </div>
    <div>
      {{ user.phone }}
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
              <fa-icon icon="times" />
            </div>
            <h4>Atualizar usuário</h4>
            <transition name="fade">
              <div v-if="error" class="error">
                Todos os campos são necessários
              </div>
            </transition>
            <label for="nome">Nome</label>
            <input v-model="nome" type="text" id="nome" />
            <label for="tel">Telefone</label>
            <input v-model="tel" type="text" id="tel" />
            <button
              @click.prevent="editUser({ nome, tel }, user.id)"
              class="success"
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
      nome: null,
      tel: null,
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

@keyframes bounce {
  50% {
    background: lighten($color: lightgreen, $amount: 20);
  }
}
</style>
