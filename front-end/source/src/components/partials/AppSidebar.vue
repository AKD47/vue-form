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
          <router-link class="nav-link" to="/users-managment">
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
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

export default {
  name: 'app-sidebar',
  data() {
    return {
      info: null,
      user: localStorage.getItem('user'),
      token: localStorage.getItem('token'),
      // results: [],
    };
  },
  state: {
    //изначальный статус строкового значение является пустым
    status: '',
    //
    token: localStorage.getItem('token') || '',
    user : localStorage.getItem('user')
  },
  mutations: {
    auth_success(state, token, user){
      state.status = 'success'
      state.token = token
      state.user = user
    },
  },
  methods: {
    handleSubmit(user) {
        axios({url: `${Host}/user`, data: user, method: 'GET'})
          .then(response => {
            const token = response.data.token
            const user = response.data.user
            axios.defaults.headers.common['Authorization'] = token
            this.results = response.user
            // console.log(user)
            resolve(response)
          })
          .catch(err => {
            console.log(err)
            // localStorage.removeItem('token')
            // reject(err)
          })


          // const user = JSON.parse(localStorage.getItem('user'));
          // const token = localStorage.getItem('token');
          // var myRequest = new XMLHttpRequest();
          // myRequest.onreadystatechange = function() {
          //   console.log(myRequest.responseText);
          // };
          // myRequest.open('POST', `${Host}/user`);
          // axios.defaults.headers.common['Authorization'] = token
          // myRequest.send(JSON.stringify());
      // this.$store.dispatch('revokeApi')
      //   .then(() => console.log(this))
      //   .catch(err => console.log(err))
    }
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
