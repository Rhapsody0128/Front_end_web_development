<template>
  <div id="app">
    <div>
      <Slide id="sidebar" :closeOnNavigation="true" :width="(screenWidth - 50).toString()" class="position-absoulte">
        <router-link to='/'><span>凡妮莎</span></router-link>
        <router-link to='/menu'><span>菜單</span></router-link>
        <router-link to='/story'><span>關於我們</span></router-link>
        <router-link to='/news'><span>最新消息</span></router-link>
        <router-link to='/location'><span>店家資訊</span></router-link>
        <router-link to='/member'><span>會員專區</span></router-link>
        <router-link to='/member_login'><span>會員專區(LOGIN TEST)</span></router-link>
      </Slide>
    </div>
    <vue-page-transition name="fade-in-up">
      <router-view/>
    </vue-page-transition>
    <footer class="footer fixed-bottom"></footer>
  </div>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {
  data () {
    return {
      toggle: true,
      screenWidth: document.documentElement.clientWidth
    }
  },
  methods: {
  },
  watch: {
    screenWidth: function (val) {
      val = parseInt(val)
      this.$store.commit('getScreenWidth', val)
      return this.$store.getters.screenWidth - 50
    }
  },
  mounted () {
    var _this = this
    window.onresize = function () {
      _this.screenWidth = document.documentElement.clientWidth
    }
  },

  components: {
    Slide
  }
}
</script>
<style lang="stylus" scoped>
.footer{
  width 100%
  height 3rem
  background rgba(0,0,0,0.3)
}
</style>
