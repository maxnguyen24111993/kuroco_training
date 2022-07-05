<template>
  <div v-if="loading" class="indicator">
    <p class="indicator__loading">Loading...</p>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  data: () => ({
    loading: false
  }),
  methods: {
    start () {
      this.loading = true
    },
    finish () {
      this.loading = false
    }
  }
})
</script>

<style scoped>
.indicator {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
  text-align: center;
  font-size: 30px;
}

.indicator__loading {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
