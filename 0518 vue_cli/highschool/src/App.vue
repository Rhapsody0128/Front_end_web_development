<template lang='pug'>
  #app
    Top
    #left
      Menu
      Update
    #right
      Marquee
      #content
        Main(v-if="page == 'main'")
    Footer
</template>

<script>

import Top from './components/Top.vue'
import Menu from './components/Menu.vue'
import Update from './components/Update.vue'
import Marquee from './components/Marquee.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Top,
    Menu,
    Update,
    Marquee,
    Main,
    Footer
  },
  data () {
    return {
      page: 'main'
    }
  }
}
</script>

<style>

</style>
