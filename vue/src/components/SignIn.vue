<template>
  <form class="mt-5" @submit.prevent="enterUser">
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Ввведите email:" v-model="user.email" required>
    </div>
    <div class="form-group">
      <label for="password">Ваш пароль:</label>
      <input type="password" class="form-control" id="password" placeholder="Введите пароль:" v-model="user.password" required>
    </div>
    <button type="submit" class="btn btn-primary">Войти</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        }
      }
    },
    methods: {
      enterUser() {
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
          .then( response => {
            console.log(response);
            const sett = {
              email: response.user.email,
              uid: response.user.uid,
              mainPage: true,
              complete: true
            }
            console.log(sett);
            this.$emit('addUser', sett);
          })
      }
    }
  }
</script>
