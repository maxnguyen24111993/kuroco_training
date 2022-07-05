<template>
  <div class="home">
    <h1 class="home__title">Home Page</h1>
    <div class="home__content">
      <div class="home__detail" v-for="list in response">
        <h1 class="home__detail-title">{{ list.ext_1 }}</h1>
        <h3 class="home__detail-subTitle">{{ list.ext_2 }}</h3>
        <p class="home__detail-description">{{ list.ext_3 }}</p>
        <p class="home__detail-image"><img :src="list.ext_4.url" :alt="list.ext_4.desc" width="500px"></p>
        <p class="home__detail-video" v-if="list.ext_5">
          <iframe
            width="928"
            height="522"
            :src="list.ext_5"
            title="移動の仕組みづくりは地域の力を育てる"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
          </iframe>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { API_SERVICES } from "~/constants";

export default Vue.extend({
  name: 'HomePage',
  data () {
    return {
      isShow: null,
      response: {}
    }
  },
  mounted() {
    this.$nextTick(() => this.$nuxt.$loading.start())
    this.isShow = this.$store.getters.getAuthenticated
    this.$axios.$get(this.$config.baseURL + API_SERVICES.LISTS_BLOG)
      .then(response => {
        console.log(response)
        this.response = response.list
        this.$nuxt.$loading.finish()
      }).catch(e => {
        console.log(e.response)
        this.$nuxt.$loading.finish()
      })
  }
})
</script>

<style>
  .home {
    max-width: 1280px;
    margin: 30px auto;
  }

  .home__content {
    margin-top: 30px;
  }

  .home__detail {
    margin-bottom: 20px;
  }

 .home__detail-title,
 .home__detail-subTitle,
 .home__detail-description {
   margin-bottom: 10px;
 }
</style>
