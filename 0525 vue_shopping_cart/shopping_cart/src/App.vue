
  <template lang='pug'>
#app
  #nav
    router-link(to='/') Home
    | |
    router-link(to='/about') About
    | |
    router-link(to='/product') Product
    | |
    router-link(to='/cart') Cart
    vue-page-transition(name="fade")
    keep-alive
      router-view.

</template>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
