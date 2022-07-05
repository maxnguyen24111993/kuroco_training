<template>
  <div class="form">
    <h1 class="form__title">会員登録</h1>
    <div class="form__row">
      <span class="form__label">お名前<i class="form__require">*</i></span>
      <div class="form__detail">
        <div class="form__col-2 form__firstname">
          <span class="form__text">姓</span>
          <input type="text" v-model="firstName" class="form__input" placeholder="姓">
        </div>
        <div class="form__col-2">
          <span class="form__text">名</span>
          <input type="text" v-model="lastName" class="form__input" placeholder="名">
        </div>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">勤務先・所属団体<i class="form__require">*</i></span>
      <div class="form__detail">
        <input type="text" v-model="companyName" class="form__input" placeholder="勤務先・所属団体">
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">メールアドレス<i class="form__require">*</i></span>
      <div class="form__detail">
        <input type="email" v-model="email" class="form__input" placeholder="メールアドレス">
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">利用規約の同意<i class="form__require">*</i></span>
      <div class="form__detail">
        <a
          class="form__btnTerm"
          href="https://kuroco.app/files/legal/Kuroco-terms-of-service-en.pdf"
          target="_blank"
        >
          利用規約を見る
        </a>
        <div class="form__term">
          <input class="form_termInput" type="checkbox" v-model="isDisabled">
          <label class="form__text">利用規約に同意する</label>
        </div>
      </div>
    </div>
    <div class="form__button">
      <button
        class="form__buttonSubmit"
        :class="{'form__buttonSubmit--disabled': !isDisabled}"
        :disabled="!isDisabled" @click="onRegister">
        登録内容を確認する
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { ROUTES } from "~/constants";

export default Vue.extend({
  name: 'RegisterPage',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      isDisabled: false
    }
  },
  methods: {
    async onRegister () {
      const payload = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        companyName: this.companyName,
        isDisabled: this.isDisabled
      }
      await this.$store.commit('setProfileRegister', payload)
      await this.$router.push(ROUTES.AUTH_REGISTER_CONFIRM)
    }
  },
  mounted() {
    if (this.$store.getters.getProfileRegister) {
      const { firstName, lastName, email, companyName, isDisabled } = this.$store.getters.getProfileRegister
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.companyName = companyName
      this.isDisabled = isDisabled
    }
  }
})
</script>
