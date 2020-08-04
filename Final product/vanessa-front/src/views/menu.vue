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
      menu: [
        {
          title: '焗烤田螺',
          src: './images/meal/10623342_711455995602630_7133017122918877083_o.jpg',
          type: '前菜',
          description: '香焗烤田螺，滑順入口，新鮮美味',
          value: 200,
          popupActivo: false
        },
        {
          title: '脆皮豬腳',
          src: './images/meal/1446024568-1030571037.jpg',
          type: '主菜',
          description: '烘烤至金黃色的豬腳皮，Q彈口感讓你回味無窮',
          value: 100,
          popupActivo: false
        },
        {
          title: '南瓜濃湯',
          src: './images/meal/1446024560-3657730813.jpg',
          type: '湯品',
          description: '慢火燉煮的南瓜濃湯搭上香濃起司',
          value: 100,
          popupActivo: false
        },
        {
          title: '波士頓龍蝦',
          src: './images/meal/15585190_1203215873093304_5619001710840901032_o.jpg',
          type: '主餐',
          description: '美國空運來台波士頓龍蝦，當日到貨需要預定的好美味',
          value: 30,
          popupActivo: false
        },
        {
          title: '巧克力碎片咖啡',
          src: './images/meal/24172712_1559740427440845_187802088775107612_o.jpg',
          type: '飲料',
          description: '碎巧克力粉灑在香醇濃郁卡布奇諾，入口絕對讓您回味無窮',
          value: 300,
          popupActivo: false
        },
        {
          title: 'OREO巧克力冰沙',
          src: './images/meal/102561187_3084463884968484_6852134654456102912_o.jpg',
          type: '飲料',
          description: '炎炎夏日的好選擇，巧克力冰沙和OREO的絕妙搭配，值得您來品嘗',
          value: 500,
          popupActivo: false
        },
        {
          title: '明太子手工披薩',
          src: './images/meal/87051272_2843385012409707_6816016157045161984_o.jpg',
          type: '披薩',
          description: '明太子醬和新鮮海鮮和烤到酥脆的薄皮披薩皮的美味三重奏，挑戰你的味蕾',
          value: 300,
          popupActivo: false
        },
        {
          title: '青醬沙拉佐新鮮水果',
          src: './images/meal/1446024564-728212007.jpg',
          type: '沙拉',
          description: '羅勒醬和沙拉的清爽新搭配，健康高纖，美味又健康',
          value: 80,
          popupActivo: false
        },
        {
          title: '義式海鮮焗烤燉飯',
          src: './images/meal/88052986_2856344687780406_4312487979428872192_o.jpg',
          type: '主餐',
          description: '小章魚、蝦仁、鮮嫩魚片...各式新鮮海產加上獨特醬料和焗烤一起燉煮，滿分飽足感滿足你的胃',
          value: 200,
          popupActivo: false
        },
        {
          title: '綜合歐風手工麵包',
          src: './images/meal/10441269_845008455580716_637845452021698813_n.jpg',
          type: '前菜',
          description: '入口酥脆，回味無窮，平凡的外表，不平凡的美味',
          value: 99,
          popupActivo: false
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
            src: 'process.env.VUE_APP_APIURL' + '/images/' + data.src,
            popupActivo: false
          }
        })
      })
      .catch(error => {
        console.log(error.response.data.message)
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
