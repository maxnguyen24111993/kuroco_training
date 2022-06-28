<template>
  <HomePage />
</template>

<script lang="ts">
import Vue from 'vue'
import HomePage from "~/pages/home/index.vue"

export default Vue.extend({
  name: 'IndexPage',
  components: { HomePage }
})
</script>
