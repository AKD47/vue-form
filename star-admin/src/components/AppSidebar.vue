<template lang="html">

  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
       <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="menu-icon mdi mdi-television"></i>
            <span class="menu-title">Products</span>
            <i class="menu-arrow"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/task-managment">
            <i class="menu-icon mdi mdi-notification-clear-all"></i>
            <span class="menu-title">Task-managment</span>
            <i class="menu-arrow"></i>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/users">
            <i class="menu-icon mdi mdi-account"></i>
            <span class="menu-title">Users</span>
            <i class="menu-arrow"></i>
          </router-link>
        </li>
      </ul>
      <button @click="handleSubmit" class="btn btn-block btn-primary btn-lg font-weight-medium w-75 app-sidebar--btn">Revoke API key</button>

    </nav>

  </section>

</template>

<script lang="js">
export default {
  name: 'app-sidebar',
  data() {
    return {

    };
  },
}
</script>

<style scoped lang="scss">
  .app-sidebar {

    &--btn {
      margin-left: calc(25%/2);
    }
  }
</style>
