<template>
  <div class="form">
    <h1 class="form__title">Your membership registration has been completed.<br>Thank you very much.</h1>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onTopPage">Top page</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RegisterThanksPage',
  methods: {
    async onTopPage () {
      await this.$router.push('/')
    }
  }
})
</script>
