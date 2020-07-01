<template>
  <div id="app">
    <div  >
      <Slide id="sidebar" :closeOnNavigation="true" :width="screenWidth - 50" class="position-absoulte">
        <router-link to='/'><span>凡妮莎</span></router-link>
        <router-link to='/menu'><span>菜單</span></router-link>
      </Slide>
    </div>

    <router-view />
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
    change () {
      console.log(this.toggle)
      this.toggle = !this.toggle
      return this.toggle
    }
  },
  watch: {
    screenWidth: function (val) {
      console.log(this.screenWidth)
      return parseInt(val) - 50
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
