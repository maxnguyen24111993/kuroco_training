<template>
  <h1>{{ response.details.subject }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData ({ $axios }) {
    try {
      console.log('index page')
      console.log('BASE_URL: ',process.env.BASE_URL)
      const response = await $axios.$get(process.env.BASE_URL + `/rcms-api/5/service/3`)
      console.log(response)
      return { response }
    }catch (e) {
      // console.log(e.message)
    }
  }
})
</script>
