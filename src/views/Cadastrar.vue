<template>
  <div class="container">
    <div class="adicionar">
      <h4 style="margin-bottom: 5px; text-align:center">Adicionar usuário</h4>
      <hr style="width:100%; margin: 0; margin-bottom: 10px" />
      <transition name="fade">
        <div v-if="error" class="error">
          Todos os campos são necessários
        </div>
      </transition>
      <form>
        <div class="form-item">
          <label for="nome">Nome</label>
          <input v-model="nome" type="text" id="nome" />
        </div>
        <div class="form-item">
          <label for="tel">Telefone</label>
          <input v-model="tel" type="text" id="tel" />
        </div>
        <button @click.prevent="addUser" class="success">Adicionar</button>
      </form>
    </div>
    <div class="lista">
      <ul>
        <transition-group :duration="300" name="remove">
          <li v-for="user in users" :key="user.id" class="remove-item">
            <user :user="user" />
          </li>
        </transition-group>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import User from "@/components/User.vue";
export default {
  components: { User },
  computed: {
    ...mapGetters({ users: 'users/users'})
  },
  data() {
    return {
      nome: "",
      tel: "",
      error: false
    };
  },
  methods: {
    resetForm() {
      (this.nome = ""), (this.tel = "");
    },
    addUser() {
      const user = {
        name: this.nome,
        phone: this.tel
      };
      if (this.nome !== "" && this.tel !== "") {
        this.$store.dispatch("users/addUser", user);
        this.resetForm();
        this.error = false;
      } else {
        this.error = true;
      }
    }
  },
  mounted() {
    this.$store.dispatch("users/loadUsers");
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  max-width: 960px;

  .adicionar {
    display: flex;
    flex-direction: column;
    form {
      display: inline-flex;
      justify-content: space-evenly;
      align-items: flex-end;
    }
    input {
      margin-top: 10px;
    }
    button,
    label {
      margin-top: 10px;
    }
    .form-item {
      input {
        width: 100%;
      }
    }
  }
  .lista {
    position: relative;
  }
}
ul {
  padding: 0;
}
li {
  list-style: none;
}
.remove-item {
  transition: all 300ms;
}
.remove-enter,
.remove-leave-to {
  opacity: 0;
}
.remove-leave-active {
  position: absolute;
  width: 100%;
}
</style>
