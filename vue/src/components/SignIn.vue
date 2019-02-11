<template>
  <form class="" @submit.prevent="enterUser">
    <div class="alert alert-danger" v-if="error">
      <strong>Oops!</strong>
      {{ messageERR }}
    </div>
    <div class="form-group">
      <label for="email">User email:</label>
      <input type="email" class="form-control" id="email" placeholder="Enter email:" v-model="user.email" required>
    </div>
    <div class="form-group">
      <label for="password">User password:</label>
      <input type="password" class="form-control" id="password" placeholder="Enter password:" v-model="user.password"
             required>
    </div>
    <button type="submit" class="btn btn-primary">Log In</button>
  </form>
</template>

<script>
  export default {
    data() {
      return {
        user: {
          email: '',
          password: ''
        },
        error: false,
        messageERR: ''
      }
    },
    methods: {
      enterUser() {
        let msg = '';
        firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.password)
          .then(response => {
            console.log(response);
            const sett = {
              email: response.user.email,
              uid: response.user.uid,
              mainPage: true,
              complete: true
            }
            this.$emit('addUser', sett);
          })
          .catch( error => {
            console.log(error);
            if (this.error = true) {
              msg = error.message;
              console.log(msg);
              this.messageERR = msg;
            }
          })
      }
    }
  }
</script>
