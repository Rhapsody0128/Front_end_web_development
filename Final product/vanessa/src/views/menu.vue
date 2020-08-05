<template>
  <div id="menu">
    <h1 class="text-center mt-4 mb-4">菜單瀏覽</h1>
    <div v-for="(meal,index) in menu" :key="index">
    <div v-if="meal.type ==='特餐'" id="spcialmeal" class="row flex-wrap justify-content-center">
      <div class="col-10 col-lg-4">
        <img class="img-fluid img-thumbnail" :src=meal.src alt />
      </div>
      <div class="col-10 col-lg-6 text-center d-flex flex-column justify-content-center">
        <h1>今日特餐</h1>
        <br>
        <br>
        <h3>{{meal.title}}</h3>
        <p>{{meal.description}}</p>
      </div>
    </div>
    </div>
    <hr />
    <div id="meal" class="row justify-content-center ">
      <div class="col-10 col-lg-2 ">
        <b-form-group>
          <template v-slot:label>
            <br >
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              @change="toggleAll"
              checked=true
            >{{ allSelected ? '取消全選' : '全選' }}</b-form-checkbox>
          </template>
          <b-form-checkbox-group
            id="flavors"
            v-model="selected"
            :options="flavours"
            name="flavors"
            class="ml-4 d-lg-flex flex-lg-nowrap flex-lg-column"
            size="lg"
            :stacked='ScreenWidth>768'
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
      <div id="showmenu" class="col-12 col-lg-8 d-flex justify-content-start flex-wrap">
        <div class="mealcard d-flex" v-for="(meal,index) in menu" :key="index">
          <transition name="fade">
            <div @click="meal.popupActivo=true" v-if="selected.includes(meal.type)">
              <div class="mealpic">
                <img :src="meal.src"></div>
              <div class="mealdes text-center">{{meal.title}}</div>
            </div>
          </transition>
          <vs-popup class="holamundo text-center" :title=meal.title :active.sync="meal.popupActivo">
            <img class="bigpic" :src="meal.src">
            <h2>{{meal.description}}</h2>
            <h4>價格:{{meal.value}}元</h4>
          </vs-popup>
        </div>
      </div>
    </div>
    <div :style="showstyle" id="show"></div>
    <div class="realmenu">
      <flipbook class="flipbook" :pages="realmenu"></flipbook>
    </div>
  </div>
</template>
<script>
import Flipbook from 'flipbook-vue'
export default {
  data () {
    return {
      popupActivo: false,
      flavours: ['前菜', '沙拉', '主餐', '披薩', '湯品', '甜點', '鬆餅', '飲料'],
      selected: ['前菜', '沙拉', '主餐', '披薩', '湯品', '甜點', '鬆餅', '飲料'],
      allSelected: true,
      indeterminate: false,
      showstyle: {},
      specialmeal: {
        src: './images/others/42889852_1935202126561338_5121489574081593344_o.jpg',
        title: '漁人海灣手工墨魚麵',
        description: '嚴選鮮蝦，小章魚，蛤蜊，墨魚搭配手工墨魚麵，是秋天首選'
      },
      realmenu: [
        '',
        './images/menu/01.jpg',
        './images/menu/02.jpg',
        './images/menu/03.jpg',
        './images/menu/04.jpg',
        './images/menu/05.jpg',
        './images/menu/06.jpg'
      ],
      menu: []
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ? this.flavours.slice() : []
    },
    ScreenWidth () {
      return this.$store.getters.screenWidth
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.flavours.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  },
  mounted: function () {
    this.axios.post(process.env.VUE_APP_APIURL + '/allmenu')
      .then(res => {
        this.menu = res.data.result.map(data => {
          return {
            title: data.title,
            value: data.value,
            type: data.type,
            description: data.description,
            src: process.env.VUE_APP_APIURL + '/images/' + data.src,
            popupActivo: false
          }
        })
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  },

  components: { Flipbook }
}
</script>

<style lang="stylus" scoped>
  .bigpic{
    width 80%
    height 80%
  }
  #show{
    width 1px
    height 1px
    position absolute
    bottom -1px
  }
  .mealpic{
    width 10rem
    height 10rem
    img{
      border-radius:50%
      width 100%
      height 100%
      object-fit cover
      padding 1rem
    }
  }
  .mealdes{
    width 8rem
    height 8rem
    padding 1rem
    margin auto
    }
    @media (min-width : 768px) {
      .mealpic{
        width 15rem
        height 15rem
      }
      .mealdes{
      width 12rem
      height 12rem
      font-size 1.2rem
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .flipbook{
      width 80%
      height 90vh
    }
</style>
