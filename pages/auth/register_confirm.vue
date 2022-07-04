<template>
  <div class="form">
    <h1 class="form__title">登録した情報確認</h1>
    <div class="form__row">
      <span class="form__label">お名前<i class="form__require">*</i></span>
      <div class="form__detail">
        <div class="form__col-2 form__firstname">
          <span class="form__text">姓</span>
          <span class="form__text">{{ firstName }}</span>
        </div>
        <div class="form__col-2">
          <span class="form__text">名</span>
          <span class="form__text">{{ lastName }}</span>
        </div>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">勤務先・所属団体<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">{{ companyName }}</span>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">メールアドレス<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">{{ email }}</span>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">利用規約の同意<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">同意する</span>
      </div>
    </div>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onEditRegister">修正する</button>
      <button class="form__buttonSubmit" @click="onConfirmRegister">登録する</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'RegisterConfirmPage',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      companyName: '',
      password: 'demo123456'
    }
  },
  methods: {
    async onEditRegister () {
      this.$router.back()
    },
    async onConfirmRegister () {
      const payload = {
        name1: this.firstName,
        name2: this.lastName,
        email: this.email,
        company_name: this.companyName,
        login_pwd: this.password
      }
      console.log(payload)
      await this.$store.dispatch('register', payload)
    }
  },
  mounted() {
    if (this.$store.getters.getProfileRegister) {
      const { firstName, lastName, email, companyName } = this.$store.getters.getProfileRegister
      this.firstName = firstName
      this.lastName = lastName
      this.email = email
      this.companyName = companyName
    }
  }
})
</script>

<style scoped lang="scss">
.form__col-2 {
  width: 49%;
  display: inline-block;
}

.form__text {
  display: block;
}

.form__firstname {
  margin-right: 2%;
}
</style>
