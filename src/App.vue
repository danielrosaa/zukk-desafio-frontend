<template>
  <div class="main-container">
    <div class="logout">
      <q-btn v-if="$route.path !== '/login'" @click="logout" icon="logout" color="primary" round />
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>

<style lang="scss">
.logout {
  position: fixed;
  top: 10px;
  right: 10px;
}
</style>