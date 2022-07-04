<template>
  <div class="form">
    <h1 class="form__title">ご登録ありがとうございました。</h1>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onTopPage">トップへ戻る</button>
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
