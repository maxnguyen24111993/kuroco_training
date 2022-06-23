<template>
  <h1>{{ response.details.subject }}</h1>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  async asyncData ({ $axios, $config: { baseURL } }) {
    try {
      const response = await $axios.$get(baseURL + `/rcms-api/5/service/3`)
      return { response }
    }catch (e) {
      console.log(e)
    }
  }
})
</script>
