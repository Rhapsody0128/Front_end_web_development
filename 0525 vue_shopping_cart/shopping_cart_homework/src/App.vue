<template lang='pug'>
#app
  #nav
    router-link(to='/') 購物區
    | |
    router-link(to='/cart') 購物車
    keep-alive
      router-view.

</template>

<style lang="stylus">
#app
  font-family '微軟正黑體'
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
  font-size 40px
</style>
