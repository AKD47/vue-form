<template>
  <form class="mt-5">
    <div class="form-group">
      <label for="email">Ваш email:</label>
      <input type="email" class="form-control" id="email" placeholder="Ввведите email:" required>
    </div>
    <div class="form-group">
      <label for="password">Ваш пароль (минимум 6 символов):</label>
      <input type="password" class="form-control" id="password" placeholder="Введите пароль:" required>
    </div>
    <div class="form-group">
      <label for="password2">Повторите пароль:</label>
      <input type="password" class="form-control" id="password2" placeholder="Повторите пароль:" required>
    </div>
    <div class="alert alert-danger" v-if="error">
      <strong>Упс!</strong> Пароли не совпадают или Вы забылы их ввести.
    </div>
    <button type="submit" class="btn btn-primary">Зарегистриваться</button>
  </form>
</template>

<script>
  export default {
    name: 'sing-up',
    data() {
      return {
        error: false,
      }
    }
  }
</script>
