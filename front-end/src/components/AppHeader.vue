<template lang="html">
  <b-navbar class="fixed-top" toggleable="md" type="dark" variant="info">
    <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
    <div class="text-center navbar-brand-wrapper d-flex align-items-top justify-content-center">
      <a class="navbar-brand brand-logo" href="/">
        <!--<img src="../assets/images/top-logo.png" alt="logo"/>-->
      </a>
      <a class="navbar-brand brand-logo-mini" href="/">
        <img src="../assets/images/logo.png" alt="logo"/>
      </a>
    </div>
    <b-collapse is-nav id="nav_collapse">
      <b-navbar-nav class="ml-auto">
        <b-nav-item right class="preview-list">
          <a class="nav-link" @click="logout">Log out</a>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="js">
export default {
  name: 'app-header',
  data () {
      return {
          
      };
  },
  methods: {
      logout: function () {
          let router = this.$router;
          localStorage.removeItem('token');
          localStorage.removeItem('username');
          localStorage.removeItem('apiKey');
          router.push({ path: '/login'})
      }
  }
}
</script>

<style scoped lang="scss">
.app-header {
}
.brand-logo {
  background-image: url(../assets/images/top-logo.png);
}
</style>
