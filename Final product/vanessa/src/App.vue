<template>
  <div id="app">
    <div id="Status">
      <router-link v-if="name.length!=0" to="/cart">
          <span>購物車</span>
      </router-link>
      <span class="m-3">
        Hi~
        <span v-if="name.length!=0">{{name}}</span>
        <span v-else>遊客</span>
      </span>
      <b-button v-if="name.length!=0" @click="logout" variant="dark">登出</b-button>

    </div>
    <div>
      <Slide
        id="sidebar"
        :closeOnNavigation="true"
        :width="(screenWidth - 50).toString()"
        class="position-absoulte"
      >
        <router-link to="/">
          <span>凡妮莎</span>
        </router-link>
        <router-link to="/menu">
          <span>菜單瀏覽</span>
        </router-link>
        <router-link to="/market">
          <span>購物廣場</span>
        </router-link>
        <router-link to="/story">
          <span>關於我們</span>
        </router-link>
        <router-link to="/news">
          <span>最新消息</span>
        </router-link>
        <router-link to="/location">
          <span>店家資訊</span>
        </router-link>
        <router-link v-if="account.length < 1" to="/member">
          <span>會員專區</span>
        </router-link>
        <router-link v-else to="/member_login">
          <span>會員專區</span>
        </router-link>
        <router-link v-if="account=='user1234'" to="/back">
          <span>後臺管理</span>
        </router-link>
        <b-navbar class="bottomnav" >
        <b-navbar-brand><span v-if="screenWidth>768">聯絡我們</span></b-navbar-brand>
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
import { Slide } from 'vue-burger-menu'
export default {
  data () {
    return {
      screenWidth: document.documentElement.clientWidth
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
  font-size:1.5rem
  span{
    margin 0.5rem
    color white
    font-weight:bolder;
  }
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
}
</style>
