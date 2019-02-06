<template>
  <form class="mt-5" @submit.prevent="registerUser">
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Ввведите email:" v-model="user.email" required>
    </div>
    <div class="form-group">
      <label for="password">Ваш пароль (минимум 6 символов):</label>
      <input type="password" class="form-control" id="password" placeholder="Введите пароль:" v-model="user.password" required>
    </div>
    <div class="form-group">
      <label for="password2">Повторите пароль:</label>
      <input type="password" class="form-control" id="password2" placeholder="Повторите пароль:" v-model="user.confirmPassword" required>
    </div>
    <div class="alert alert-danger" v-if="error">
      <strong>Упс!</strong> Пароли не совпадают или Вы забылы их ввести.
    </div>
    <button type="submit" class="btn btn-primary">Зарегистриваться</button>
  </form>
</template>

<script>
  export default {
    name: 'sign-up',
    data() {
      return {
        user: {
          email: '',
          password: '',
          confirmPassword: ''
        },
        error: false
      }
    },
    methods: {
      registerUser() {
        if(this.user.password !== this.user.confirmPassword || this.user.password.length < 6) {
          this.error = true;
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then( () => {
              this.$emit('regSuccess', 'sign-in');
            })
            .catch( error => {
              console.log(error);
            })
        }
      }
    }
  }
</script>
