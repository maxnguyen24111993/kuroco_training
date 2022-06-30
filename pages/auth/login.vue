<template>
  <div class="form">
    <h1 class="form__title">Login</h1>
    <div class="form__row">
      <span class="form__label">Email:</span>
      <div class="form__detail">
        <input type="email" v-model="email" class="form__input">
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Password:</span>
      <div class="form__detail">
        <input type="password" v-model="password" class="form__input">
      </div>
    </div>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onLogin">Login</button>
    </div>
    <div class="form__link">
      <nuxt-link to="/auth/register">You don't have account?</nuxt-link>
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
      const payload = {
        email: this.email,
        password: this.password
      }
      await this.$store.dispatch('login', payload)
    }
  }
})
</script>
