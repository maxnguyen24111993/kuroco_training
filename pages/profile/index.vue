<template>
  <div class="form">
    <h1 class="form__title">Profile</h1>
    <div class="form__row">
      <span class="form__label">First name:</span>
      <span v-if="!$store.state.isHiddenInput" class="form__input">{{ firstName }}</span>
      <input type="text" v-if="$store.state.isHiddenInput" v-model="firstName" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Last name:</span>
      <span v-if="!$store.state.isHiddenInput" class="form__input">{{ lastName }}</span>
      <input type="text" v-if="$store.state.isHiddenInput" v-model="lastName" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Email:</span>
      <span v-if="!$store.state.isHiddenInput" class="form__input">{{ email }}</span>
      <input type="text" v-if="$store.state.isHiddenInput" v-model="email" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Phone:</span>
      <span v-if="!$store.state.isHiddenInput" class="form__input">{{ phone }}</span>
      <input type="text" v-if="$store.state.isHiddenInput" v-model="phone" class="form__input">
    </div>
    <div class="form__row">
      <span class="form__label">Address:</span>
      <span v-if="!$store.state.isHiddenInput" class="form__input">{{ address }}</span>
      <input type="text" v-if="$store.state.isHiddenInput" v-model="address" class="form__input">
    </div>
    <div class="form__button">
      <button v-if="!$store.state.isHiddenInput" class="form__buttonSubmit" @click="onHiddenInput">Edit</button>
      <button v-if="!$store.state.isHiddenInput" class="form__buttonSubmit" @click="onLogout">Logout</button>
      <button v-if="!$store.state.isHiddenInput" class="form__buttonSubmit" @click="onDeleteMember">Delete</button>
      <button v-if="$store.state.isHiddenInput" class="form__buttonSubmit" @click="onHiddenInput">Cancel</button>
      <button v-if="$store.state.isHiddenInput" class="form__buttonSubmit" @click="onUpdate">Update</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'ProfilePage',
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: ''
    }
  },
  mounted() {
    this.$axios.$get(process.env.BASE_URL + `/rcms-api/10/member/profile/${this.$store.getters.getMemberId}`, {
      headers: { 'x-rcms-api-access-token': this.$store.getters.getToken }
    }).then(response => {
      const { name1, name2, email, tel, address1 } = response.details
      this.firstName = name1
      this.lastName = name2
      this.email = email
      this.phone = tel
      this.address = address1
    }).catch(e => {
      console.log(e.response)
    })
  },
  methods: {
    async onUpdate () {
      const payload = {
        name1: this.firstName,
        name2: this.lastName,
        email: this.email,
        tel: this.phone,
        address1: this.address
      }
      await this.$store.dispatch('updateMember', payload)
    },
    async onHiddenInput () {
      await this.$store.commit('setIsHiddenInput', this.$store.state.isHiddenInput)
    },
    async onLogout () {
      await this.$store.dispatch('logout')
    },
    async onDeleteMember () {
      await this.$store.dispatch('deleteMember')
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
