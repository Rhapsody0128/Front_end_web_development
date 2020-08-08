<template>
<div id="location">
<h1 class="text-center mt-4 mb-4 bigtitle">店家資訊</h1>
  <div class="container-fluid p-0 m-0">
    <div class="row m-0 p-0">
      <div class="col-12 p-0 m-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.592190167481!2d121.02436331544362!3d24.77516785477133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468362e95869081%3A0x9cc02cd8bb076e1e!2z5Yeh5aau6I6O5Y2X5q2Q6Iqx5ZyS6aSQ5buz!5e0!3m2!1szh-TW!2stw!4v1594621742442!5m2!1szh-TW!2stw" frameborder="0" style="width:100%;height:40rem;padding:0; margin:0" allowfullscreen tabindex="0"></iframe>
      </div>
    </div>
  </div>
  <div :style="infostyle" class="contianer info">
    <div class="row justify-content-center mt-5 m-0">
      <div class="col-12 p-0">
          <b-card no-body>
            <b-tabs pills card vertical>
              <b-tab v-for="(tra,index) in traffic" :key='index' :title="tra.medthods" active>
                <b-card-text>
                  <ul>
                    <li class="ml-lg-5 text" v-for="(de,index) in tra.des" :key="index">{{de}}</li>
                  </ul>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      infostyle: {},
      traffic: [
        {
          medthods: '營業時間',
          des: ['星期一:11:30–22:00', '星期二:11:30–15:00 & 17:00–22:00', '星期三:11:30–15:00 & 17:00–22:00', '星期四:11:30–15:00 & 17:00–22:00', '星期五:11:30–22:00', '星期六:11:30–22:00', '星期日:11:30–22:00']
        },
        {
          medthods: '餐廳資訊',
          des: ['電話:03-5632686', '地址:300新竹市東區金山二十三街73號']
        },
        {
          medthods: '產品/服務',
          des: ['午晚餐', '有機料理', '啤酒', '提供素食料理', '葡萄酒']
        }
      ]
    }
  },
  methods: {
    ScreenWidth () {
      return this.$store.getters.screenWidth - 800
    }
  },
  mounted: function () {
    this.$store.commit('boxshow')
    setTimeout(() => {
      this.infostyle = { display: 'block', opacity: '1' }
    }, 1000)
  }
}
</script>
<style lang="stylus">
.info{
  transition 10s
  display none
  opacity 0
}
@media (max-width: 768px) {
  .nav-item{
  font-size 1rem
  }
}
</style>
