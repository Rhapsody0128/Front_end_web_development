<template>
  <div id="app">
    <div v-if="boxshow" id='logoshow' class="bigscreen">
      <div class="logo-lg">
        <vueSvgDraw file="./images/others/LOGO.svg" start="manual" type="async" :duration="parseInt(300)" ref="vuesvg" pathTiming="EASE_OUT"></vueSvgDraw>
      </div>
    </div>
    <div id="Status">
      <router-link v-if="name.length!=0" to="/cart">
        <font-awesome-icon v-if="screenWidth>768" color='black' class='icon mr-1' size="lg" :icon="['fas', 'shopping-cart']"/>
        <font-awesome-icon v-else color='black' class='icon mr-1' size="sm" :icon="['fas', 'shopping-cart']"/>
      </router-link>
      <span class="m-3">
        <span v-if="name.length!=0">{{name}}</span>
        <span v-else>遊客</span>
      </span>
      <a href="#" @click="logout"><font-awesome-icon  v-if="name.length!=0 && screenWidth<768" color='black' class='icon mr-1' size="sm" :icon="['fas', 'sign-out-alt']"/></a>
      <b-button v-if="name.length!=0 && screenWidth>768" @click="logout" variant="dark"><span class="btntext">登出</span></b-button>
    </div>
    <div>
      <Slide
        id="sidebar"
        :closeOnNavigation="true"
        :width="(screenWidth - 50).toString()"
        class="position-absoulte">
        <router-link to="/">
          <span class="logotitle">凡妮莎</span>
        <div class="logo">
          <img :src=logo alt="">
        </div>
        </router-link>
        <router-link to="/menu">
          <span class="mr-2">菜單瀏覽</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'book-open']"/>
        </router-link>
        <router-link to="/market">
          <span class="mr-2">購物廣場</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'shopping-basket']"/>
        </router-link>
        <router-link to="/story">
          <span class="mr-2">關於我們</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'book']"/>
        </router-link>
        <router-link to="/news">
          <span class="mr-2">最新消息</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'calendar-alt']"/>
        </router-link>
        <router-link to="/location">
          <span class="mr-2">店家資訊</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'map-marker-alt']"/>
        </router-link>
        <router-link v-if="account.length < 1" to="/member">
          <span class="mr-2">會員專區</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'user']"/>
        </router-link>
        <router-link v-else to="/member_login">
          <span class="mr-2">會員專區</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'user-check']"/>
        </router-link>
        <router-link v-if="account=='user1234'" to="/back">
          <span class="mr-2">後臺管理</span><font-awesome-icon color='white' class='icon' size="lg" :icon="['fas', 'wrench']"/>
        </router-link>
        <b-navbar class="bottomnav" >
          <span v-if="screenWidth>768">聯絡我們</span>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="https://lin.ee/efWwSJs">
              <font-awesome-icon color='white' class='icon' size="lg" :icon="['fab','line']" />
            </b-nav-item>
            <b-nav-item v-if="screenWidth>768" href="https://facebook.com/vanessacafe.tw/">
              <font-awesome-icon color='white' class='icon' size="lg" :icon="['fab', 'facebook']"/>
            </b-nav-item>
            <b-nav-item v-if="screenWidth<768" href="https://m.facebook.com/vanessacafe.tw/">
              <font-awesome-icon color='white' class='icon' size="lg" :icon="['fab', 'facebook']"/>
            </b-nav-item>
            <b-nav-item href="https://instagram.com/vanessa_restaurant?igshid=mvou4tklg3rm">
              <font-awesome-icon color='white' class='icon' size="lg" :icon="['fab', 'instagram']"/>
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
      </Slide>
    </div>
    <vue-page-transition name="fade-in-up">
      <router-view />
    </vue-page-transition>
  </div>
</template>
<script>
import vueSvgDraw from 'vue-svg-draw'
import { Slide } from 'vue-burger-menu'
export default {
  data () {
    return {
      screenWidth: document.documentElement.clientWidth,
      logo: './images/others/LOGO.svg'
    }
  },
  methods: {
    logout () {
      this.$store.commit('logout')
      this.$swal('登出', '已順利登出', 'success')
      this.$router.push('/member')
    }
  },
  computed: {
    name () {
      return this.$store.getters.name
    },
    account () {
      return this.$store.getters.account
    },
    boxshow () {
      return this.$store.getters.boxshow
    }
  },
  watch: {
    screenWidth: function (val) {
      val = parseInt(val)
      this.$store.commit('getScreenWidth', val)
      return this.$store.getters.screenWidth - 50
    },
    name: function (value) {
      return this.$store.getters.name
    }
  },
  mounted: function () {
    var _this = this
    window.onresize = function () {
      _this.screenWidth = document.documentElement.clientWidth
    }
  },
  components: {
    vueSvgDraw,
    Slide
  },
  props: ['logoshow']
}
</script>
<style lang="stylus">
#Status{
  margin 1.5rem
  position fixed
  right 0
  top 0
  z-index 999
  color black
  font-weight:bolder;
  font-size:1.5rem
  text-shadow:white 0rem 0rem 0.2rem
}
.bottomnav{
  font-size:1.1rem
  span{
    margin 0.2rem
    color white
    font-weight:bolder;
  }
}
.logo{
  width 2.5rem
  height 2.5rem
  img{
    width 100%
    height 100%
    object-fit cover
  }
}
.bigscreen{
  background gray
  width 100%
  height 100%
  z-index 99
  position fixed
  pointer-events: none;
  animation fadeout ease-in-out 3s
  opacity 0
  .logo-lg{
    width: 970px;
    height: 970px;
    margin: auto
    margin-top: -4.3rem;
    pointer-events: none;
    position absolute
    top 0
    right 0
    left 0
    right 0
    z-index 4
  }
}
.logotitle{
  line-height 2.5rem
}
@media (max-width: 768px) {
  #Status{
    span{
      display none
    }
  }
  .bottomnav{
    background none
  }
  .bigscreen{
  background gray
  width 100%
  height 100%
  z-index 99
  position fixed
  pointer-events: none;
  opacity 0
  animation fadeout ease-in-out 3s
  .logo-lg{
    width: 100%;
    height: 30rem;
    margin-top: -15.5%;
    margin auto
    pointer-events: none;
    position absolute
    top 0
    right 0
    left 0
    bottom  0
    z-index 4
    }
  }
}
@keyframes fadeout {
  0% {
    opacity 1
  }
  100% {
    opacity 0
  }
}
</style>
