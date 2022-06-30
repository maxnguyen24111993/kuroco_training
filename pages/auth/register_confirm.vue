<template>
  <div class="form">
    <h1 class="form__title">Confirm Register</h1>
    <div class="form__row">
      <span class="form__label">Full name<i class="form__require">*</i></span>
      <div class="form__detail">
        <div class="form__col-2 form__firstname">
          <span class="form__text">First name</span>
          <span class="form__text">{{ firstName }}</span>
        </div>
        <div class="form__col-2">
          <span class="form__text">Last name</span>
          <span class="form__text">{{ lastName }}</span>
        </div>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Company name<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">{{ companyName }}</span>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Email<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">{{ email }}</span>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Terms & Conditions<i class="form__require">*</i></span>
      <div class="form__detail">
        <span class="form__text">Accept</span>
      </div>
    </div>
    <div class="form__button">
      <button class="form__buttonSubmit" @click="onEditRegister">Edit</button>
      <button class="form__buttonSubmit" @click="onConfirmRegister">Confirm</button>
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
