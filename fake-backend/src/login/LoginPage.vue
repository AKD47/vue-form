<template>
  <div class="main">
    <div class="main__wrapper">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-sm-6 col-xs-12 mx-auto">
            <div class="main__flex">
              <div class="main__form">
                <span class="main__logo"></span>
                <div class="alert alert-info">
                  Username: test<br/>
                  Password: test
                </div>
                <h2>Login</h2>
                <form @submit.prevent="handleSubmit">
                  <div class="form-group">
                    <label for="username">Username</label>
                    <input type="text" v-model="username" name="username" class="form-control"
                           :class="{ 'is-invalid': submitted && !username }"/>
                    <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
                  </div>
                  <div class="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" v-model="password" name="password" class="form-control"
                           :class="{ 'is-invalid': submitted && !password }"/>
                    <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-primary" :disabled="loggingIn">Login</button>
                    <img v-show="loggingIn"
                         src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="/>
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
  export default {
    data() {
      return {
        username: '',
        password: '',
        submitted: false
      }
    },
    computed: {
      loggingIn() {
        return this.$store.state.authentication.status.loggingIn;
      }
    },
    created() {
      // reset login status
      this.$store.dispatch('authentication/logout');
    },
    methods: {
      handleSubmit(e) {
        this.submitted = true;
        const {username, password} = this;
        const {dispatch} = this.$store;
        if (username && password) {
          dispatch('authentication/login', {username, password});
        }
      }
    }
  };
</script>

<style lang="scss">
  .main {
    position: relative;
    float: left;
    width: 100%;
    height: 100vh;
    background-image: url("bg-baner-tablet.png");
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
      background-image: url('top-logo.png');
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
