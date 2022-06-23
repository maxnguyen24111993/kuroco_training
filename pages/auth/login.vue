<template>
  <div class="form">
    <h1 class="form__title">Login</h1>
    <div class="form__row">
      <span class="form__label">Email:</span>
      <input type="email" v-model="email" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Password:</span>
      <input type="password" v-model="password" class="form__input">
    </div>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onLogin">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'LoginPage',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async onLogin () {
      try {
        const objData = {
          email: this.email,
          password: this.password
        }
        // const response = await this.$axios.$post(process.env.BASE_URL + '/rcms-api/7/login', objData)
        const response = await this.$axios.$get(process.env.BASE_URL + '/rcms-api/5/service')
        console.log(response)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.form {
  width: 800px;
  border: 1px solid #000000;
  border-radius: 5px;
  margin: 20px auto;
  padding: 15px;
}

.form__title {
  font-size: 22px;
  text-align: center;
  margin: 20px 0;
}

.form__row {
  font-size: 0;
  padding: 10px;
}

.form__label {
  display: inline-block;
  width: 25%;
  font-size: 16px;
}

.form__input {
  display: inline-block;
  width: 75%;
  font-size: 16px;
  padding: 6px 10px;
}

.form__button {
  text-align: center;
  margin: 20px 0;
}

.form__buttonSubmit {
  background-color: #ffffff;
  border: 1px solid #000000;
  border-radius: 5px;
  padding: 8px 30px;
  cursor: pointer;
}
</style>
