<template lang="html">

  <section class="app-sidebar">
    <nav class="sidebar sidebar-offcanvas" id="sidebar">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link" to="/">
            <i class="menu-icon mdi mdi-television"></i>
            <span class="menu-title">Products</span>
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/task-managment">
            <i class="menu-icon mdi mdi-television"></i>
            <span class="menu-title">Task-managment</span>
          </router-link>
        </li>
         <li class="nav-item">
          <router-link class="nav-link" to="/users">
            <i class="menu-icon mdi mdi-television"></i>
            <span class="menu-title">Users</span>
          </router-link>
        </li>

      </ul>
    </nav>
  </section>

</template>

<script lang="js">
export default {
  name: 'app-sidebar'
}
</script>

<style scoped lang="scss">
  .app-sidebar {

  }
</style>
