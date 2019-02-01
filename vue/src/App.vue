<template>
  <div>
    <div class="container-fluid navbar-inverse bg-inverse">
      <div class="row">
        <div class="col">
          <nav class="navbar">
            <form class="form-inline d-flex justify-content-end">
              <div>
                <button class="btn btn-outline-success mr-3" type="button" @click="switchSign('sign-in')">Войти</button>
                <button class="btn btn-outline-success" type="button" @click="switchSign('sign-up')">Регистрация</button>
              </div>
            </form>
          </nav>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col">
          <sign-in v-if="sign === 'sign-in'"></sign-in>
          <sign-up v-else></sign-up>
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
        sign: 'sign-in'
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

</style>
