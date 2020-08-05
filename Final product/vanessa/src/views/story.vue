<template>
  <div :style=storystyle id="story">
    <h1 class="text-center mt-4 mb-4 ">關於我們</h1>
    <div v-if="ScreenWidth>768" style="background:url('./images/atmosphere/13350244_1033842330030660_1000111736185408760_o.jpg') no-repeat fixed center/auto" class='story p-0'></div>
    <div v-else style="background:url('./images/atmosphere/150166_293460857402148_828730403_n.jpg') no-repeat fixed center/auto" class='story p-0'></div>
    <div id="flipbook" class='d-flex flex-wrap'>
      <div class="row justify-content-center mt-5 mb-5 m-0 col-12">
        <div :style="slideleftstyle" class="slideleft">
          <img :src="slideleft" alt="">
        </div>
        <flipbook class="flipbook col-12 col-lg-7 p-0" :pages="employee"></flipbook>
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-center p-4 text-center">
          <h2 class="title-lg">重視服務品質</h2>
          <p>優質的服務團隊，重視每個貴賓用餐的環節，專業之外更在意與客人間的體貼 互動，讓您每一次的蒞臨都有回家般的舒適感。</p>
        </div>
      </div>
      <div class="row justify-content-center mt-5 mb-5 m-0 col-12">
        <flipbook class="flipbook col-12 mb-n5 m-lg-0 col-lg-6 p-0 order-lg-2" :pages="atmosphere"></flipbook>
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-center p-lg-4 mt-n5 m-lg-0 text-center order-lg-1">
          <h2 class="title-lg">怡然的南歐風環境</h2>
          <p>以南歐花園為空間設計的發想，在細節處打造甜蜜浪漫的迷人氛圍，是許多網拍型錄、婚紗照、知名部落客取景的首選之處。</p>
        </div>
      </div>
      <div class="row justify-content-center mt-5 mb-5 m-0 col-12">
        <flipbook class="flipbook col-12 col-lg-7 p-0" :pages="meal"></flipbook>
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-center p-4 text-center">
          <h2 class="title-lg">嚴選食材，用心烹調</h2>
          <p class="font">嚴選新鮮頂級的食材，佐入主廚費工自製的醬料，採用自然原味的料理手法，為您呈現一道道兼顧健康美味的歐法風味料理。</p>
        </div>
      </div>
      <div class="row justify-content-center mt-5 mb-5 m-0 col-12">
        <flipbook class="flipbook col-12 col-lg-6 p-0 order-lg-4" :pages="dessert"></flipbook>
        <div class="col-12 col-lg-3 d-flex flex-column justify-content-center p-lg-4 text-center order-lg-3">
          <h2 class="title-lg">客製化甜點</h2>
          <p>提供客製的造型蛋糕，依客人的需求與愛好，從畫設計稿到製作完成，唯妙唯肖的萌樣，總帶給客人莫大的驚喜，深受喜愛。</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Flipbook from 'flipbook-vue'
export default {
  data () {
    return {
      slideleft: './images/others/slideleft.svg',
      slideleftstyle: {},
      storystyle: {},
      employee: [
        '',
        './images/human/1446024581-183110139.jpg',
        './images/human/12109026_897899423624952_4910334334310639949_n.jpg',
        './images/human/12182436_909169649164596_8684931956317315354_o.jpg',
        './images/human/14902862_1147369728677919_3502097085568784232_o.jpg',
        './images/human/22894475_1527219090692979_1297712814055284220_n.jpg',
        './images/human/10349228_801510813263814_265105284969765050_n.jpg'
      ],
      atmosphere: [
        '',
        './images/atmosphere/16836713_1278350288913195_1836580406618934860_o.jpg',
        './images/atmosphere/11742788_863205253761036_414259416480560783_n.jpg',
        './images/atmosphere/1446024542-791586990.jpg',
        './images/atmosphere/1446024549-3210848441.jpg',
        './images/atmosphere/1446024555-1915514515.jpg',
        './images/atmosphere/1446024547-2141009218.jpg',
        './images/atmosphere/16836713_1278350288913195_1836580406618934860_o.jpg',
        './images/atmosphere/1446024543-869366151.jpg',
        './images/atmosphere/1446024544-2245371862.jpg'
      ],
      meal: [
        '',
        './images/meal/11221392_868827659865462_5894918865867276644_n.jpg',
        './images/meal/10623342_711455995602630_7133017122918877083_o.jpg',
        './images/meal/10917947_769796026435293_1636765122636558243_o.jpg',
        './images/meal/10441269_845008455580716_637845452021698813_n.jpg',
        './images/meal/1446024566-2550922969.jpg',
        './images/meal/102561187_3084463884968484_6852134654456102912_o.jpg',
        './images/meal/1446024571-2535762666.jpg',
        './images/meal/1446024560-3657730813.jpg',
        './images/meal/90170087_2914208675327340_5898319037598793728_o.jpg',
        './images/meal/88052986_2856344687780406_4312487979428872192_o.jpg'
      ],
      dessert: [
        '',
        './images/dessert/10534472_694446700636893_2885955224173685067_n.jpg',
        './images/dessert/10616452_709715432443353_5687785441535806101_n.jpg',
        './images/dessert/12052439_908768612538033_3320235675930103309_o.jpg',
        './images/dessert/14691922_1135028349912057_1290868994342392379_o.jpg',
        './images/dessert/17632417_1338476692900554_2076370818259334964_o.jpg',
        './images/dessert/19642407_1416275871787302_3238815056479220235_n.jpg',
        './images/dessert/21106839_1469362176478671_1262980453055672438_n.jpg',
        './images/dessert/22256378_1507304756017746_3261313359297644928_o.jpg'
      ]
    }
  },
  computed: {
    ScreenWidth () {
      return this.$store.getters.screenWidth
    }
  },
  mounted: function () {
    this.storystyle = {
      overflow: 'hidden'
    }
    setTimeout(() => {
      this.storystyle = {
        overflow: 'auto'
      }
    }, 700)
    this.slideleftstyle = {
      opacity: 0,
      marginRight: '50%'
    }
  },
  components: {
    Flipbook
  }
}
</script>
<style lang="stylus" scoped>
#flipbook{
  .flipbook{
    .viewport{
      .container{
        padding 0px !important
      }
    }
  }
}
.story{
  width 100%
  height 30rem
}
.text{
  color white
  }
.flipbook {
  width:50%
  height: 40rem;
}
.slideleft{
  width 40rem
  height 40rem
  position absolute
  z-index 9
  pointer-events none
  margin-left -20%
  transition 8s
  }
</style>
