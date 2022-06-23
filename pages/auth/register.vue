<template>
  <div class="form">
    <h1 class="form__title">Register</h1>
    <div class="form__row">
      <span class="form__label">First name:</span>
      <input type="text" v-model="firstName" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Last name:</span>
      <input type="text" v-model="lastName" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Email:</span>
      <input type="email" v-model="email" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Password:</span>
      <input type="password" v-model="password" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Phone number:</span>
      <input type="text" v-model="phone" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Address:</span>
      <input type="text" v-model="address" class="form__input">
    </div>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onRegister">Register</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RegisterPage',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone: '',
      address: ''
    }
  },
  methods: {
    async onRegister () {
      try {
        const objData = {
          name1: this.firstName,
          name2: this.lastName,
          email: this.email,
          login_pwd: this.password,
          tel: this.phone,
          address1: this.address
        }
        const response = await this.$axios.$post(process.env.BASE_URL + '/rcms-api/7/member/regist', objData)
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
