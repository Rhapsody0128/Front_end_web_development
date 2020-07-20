<template>
  <div id="menu">
    <h1 class="text-center mt-4 mb-4">菜單</h1>
    <div id="spcialmeal" class="row flex-wrap justify-content-center">
      <div class="col-10 col-lg-4">
        <img class="img-fluid img-thumbnail" :src=specialmeal.src alt />
      </div>
      <div class="col-10 col-lg-6 text-center d-flex flex-column justify-content-center">
        <h1>Spcial Meal</h1>
        <h2>{{specialmeal.title}}</h2>
        <p>{{specialmeal.description}}</p>
      </div>
    </div>
    <hr />
    <div id="meal" class="row justify-content-center ">
      <div class="col-10 col-lg-2 ">
        <b-form-group>
          <template v-slot:label>
            <h1>菜單</h1>
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
            class="ml-4"
            switches
            size="lg"
            :stacked='ScreenWidth>768'
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
      <div id="showmenu" class="col-12 col-lg-8 d-flex justify-content-center flex-wrap">
        <div class="mealcard d-flex" v-for="(meal,index) in menu" :key="index">
          <transition name="fade">
            <div @click="bigpic(index)" v-if="selected.includes(meal.type)">
              <div class="mealpic">
                <img :src="meal.src"></div>
              <div class="mealdes">{{meal.description}}</div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <div :style="showstyle" id="show"></div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      flavours: ['前菜', '主餐', '湯品', '飲料', '披薩', '甜點'],
      selected: ['前菜', '主餐', '湯品', '飲料', '披薩', '甜點'],
      allSelected: true,
      indeterminate: false,
      showstyle: {},
      specialmeal: {
        src: './images/4903092900_ff43be2aff_o.jpg',
        title: '好吃豬腳',
        description: '豬腳切斷後，努力絞成碎片，端上桌'
      },
      menu: [
        {
          src: './images/1472660456_1e1841d24e_o.jpg',
          type: '前菜',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/1472660456_1e1841d24e_o.jpg',
          type: '前菜',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/36271782954_f7aa950180_o.jpg',
          type: '主餐',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/9677717700_3b10b4f206_o.jpg',
          type: '湯品',
          description: '毫無反應就是香腸毫無反應就是香腸'
        },
        {
          src: './images/9677717700_3b10b4f206_o.jpg',
          type: '湯品',
          description: '毫無反應就是香腸毫無反應就是香腸'
        }
      ]
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ? this.flavours.slice() : []
    },
    ScreenWidth () {
      return this.$store.getters.screenWidth
    },
    bigpic (index) {

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
  }
}
</script>

<style lang="stylus" scoped>
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
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
</style>
