<template>
  <form class="" @submit.prevent="registerUser">
    <div class="alert alert-danger" v-if="error">
      <strong>Oops!</strong>
      {{ messageERR }}
    </div>
    <div class="form-group">
      <label for="email">Your email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email:" v-model="user.email" required>
    </div>
    <div class="form-group">
      <label for="password">Your password (min 6 symbols):</label>
      <input type="password" class="form-control" id="password" placeholder="Enter password:" v-model="user.password" required>
    </div>
    <div class="form-group">
      <label for="password2">Confirm password:</label>
      <input type="password" class="form-control" id="password2" placeholder="Confirm password:" v-model="user.confirmPassword" required>
    </div>
    <button type="submit" class="btn btn-primary">Registration</button>
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
        error: false,
        messageERR: ''
      }
    },
    methods: {
      registerUser() {
        let msg = '';
        if(this.user.password !== this.user.confirmPassword || this.user.password.length < 6) {
          this.error = true;
          this.messageERR = 'Passwords do not match or are incorrectly entered.'
        } else {
          firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.password)
            .then( () => {
              this.$emit('regSuccess', 'sign-in');
            })
            .catch( error => {
              if (this.error = true) {
                msg = error.message;
                console.log(msg);
                this.messageERR = msg;
              }
            })
        }
      }
    }
  }
</script>
