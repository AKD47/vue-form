<template>
  <div class="main">
    <div class="main__wrapper">
      <div class="container" v-if="!isMainPage">
        <div class="row">
            <div class="col-lg-4 col-sm-6 col-xs-12 mx-auto">
              <div class="main__flex">
                <div class="main__form">
                  <span class="main__logo"></span>
                  <sign-in v-if="sign === 'sign-in'" @addUser="isMainPage = $event.mainPage, signComplete = $event.complete, email = $event.email, uid = $event.uid"></sign-in>
                  <sign-up v-else @regSuccess="sign = $event"></sign-up>
                  <form class="main__switcher">
                    <div v-if="!signComplete">
                      <p class="main__switcher--element" v-if="sign === 'sign-up'">Have an account? <a href="#" @click="switchSign('sign-in')">Log In</a></p>
                      <p class="main__switcher--element" v-else>No account? <a href="#" @click="switchSign('sign-up')">Registration</a></p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
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
      },
      signOut() {
        firebase.auth().signOut()
      }
    }
  }
</script>

<style lang="scss">
  .main {
    position: relative;
    float: left;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/img/bg-baner-tablet.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;

    &__wrapper {
      position: relative;
      float: left;
      width: 100%;
    }

    &__flex {
      display: flex;
      flex-wrap: wrap;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    &__form {
      position: relative;
      float: left;
      width: 100%;
      min-height: 440px;
      max-height: 100%;
      padding: 40px 20px 60px;
      border-radius: 2px;
      background-color: #fff;

      .alert {
        float: left;
        width: 100%;
        margin-top: 15px;
      }
    }

    &__logo {
      position: relative;
      float: left;
      width: 100%;
      height: 30px;
      margin-bottom: 15px;
      background-image: url('../assets/img/top-logo.png');
      background-repeat: no-repeat;
      -webkit-background-size: contain;
      background-size: contain;
      background-position: center center;
    }

    &__switcher {
      position: absolute;
      bottom: 0;
      width: 100%;
      left: 0;

      &--element {
        position: relative;
        float: left;
        width: 100%;
        margin: 15px 0;
        text-align: center;

        a {
          color: #007bff;

          &:hover, &:active {
            color: #0062cc;
          }
        }
      }
    }

    &__box {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      position: relative;
      float: left;
      width: 100%;

      .form-group {
        width: 100%;
      }
    }
  }

  .user {
    display: flex;
    flex-wrap: wrap;
    align-content: center;
    position: relative;
    color: #fff;
    margin-right: 20px;
  }
</style>
