<template>
  <div class="container">
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
  mounted() {
    this.$store.dispatch("users/loadUsers");
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 80%;
  margin: 0 auto;
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
