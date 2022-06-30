<template>
  <div class="form">
    <h1 class="form__title">Register</h1>
    <div class="form__row">
      <span class="form__label">Full name<i class="form__require">*</i></span>
      <div class="form__detail">
        <div class="form__col-2 form__firstname">
          <span class="form__text">First name</span>
          <input type="text" v-model="firstName" class="form__input" placeholder="First name">
        </div>
        <div class="form__col-2">
          <span class="form__text">Last name</span>
          <input type="text" v-model="lastName" class="form__input" placeholder="Last name">
        </div>
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Company name<i class="form__require">*</i></span>
      <div class="form__detail">
        <input type="text" v-model="companyName" class="form__input" placeholder="Company name">
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Email<i class="form__require">*</i></span>
      <div class="form__detail">
        <input type="email" v-model="email" class="form__input" placeholder="Email">
      </div>
    </div>
    <div class="form__row">
      <span class="form__label">Terms & Conditions<i class="form__require">*</i></span>
      <div class="form__detail">
        <a
          class="form__btnTerm"
          href="https://kuroco.app/files/legal/Kuroco-terms-of-service-en.pdf"
          target="_blank"
        >
          Terms & Conditions
        </a>
        <div class="form__term">
          <input class="form_termInput" type="checkbox" v-model="isDisabled">
          <label class="form__text">Accept Terms & Conditions</label>
        </div>
      </div>
    </div>
    <div class="form__button">
      <button
        class="form__buttonSubmit"
        :class="{'form__buttonSubmit--disabled': !isDisabled}"
        :disabled="!isDisabled" @click="onRegister">
        Register
      </button>
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
      await this.$router.push('/auth/register_confirm')
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
