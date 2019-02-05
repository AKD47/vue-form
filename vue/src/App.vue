<template>
  <div>
    <div class="container-fluid navbar-inverse bg-dark">
      <div class="row">
        <div class="col">
          <nav class="navbar">
            <form class="form-inline d-flex justify-content-end">
              <div v-if="!signComplete">
                <button class="btn btn-outline-success mr-3" type="button" @click="switchSign('sign-in')">Войти</button>
                <button class="btn btn-outline-success" type="button" @click="switchSign('sign-up')">Регистрация</button>
              </div>
              <span class="user" v-else>{{ email }}</span>
            </form>
          </nav>
        </div>
      </div>
    </div>
    <div class="container" v-if="!isMainPage">
      <div class="row">
        <div class="col">
          <sign-in v-if="sign === 'sign-in'" @addUser="isMainPage = $event.mainPage, signComplete = $event.complete, email = $event.email, uid = $event.uid"></sign-in>
          <sign-up v-else @regSuccess="sign = $event"></sign-up>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SignIn from './components/SignIn.vue'
  import SignUp from './components/SignUp.vue'
  export default {
    name: 'app',
    data() {
      return {
        sign: 'sign-in',
        isMainPage: false,
        signComplete: false,
        email: '',
        uid: ''
      }
    },
    components: {
      SignIn,
      SignUp
    },
    methods: {
      switchSign(currentSign) {
        this.sign = currentSign;
      }
    }
  }
</script>

<style lang="scss">
  .user {
    color: #fff;
  }
</style>
