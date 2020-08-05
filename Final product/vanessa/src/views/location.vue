<template>
<div id="location">
<h1 class="text-center mt-4 mb-4">店家資訊</h1>
  <div class="container-fluid p-0 m-0">
    <div class="row m-0 p-0">
      <div class="col-12 p-0 m-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3622.592190167481!2d121.02436331544362!3d24.77516785477133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3468362e95869081%3A0x9cc02cd8bb076e1e!2z5Yeh5aau6I6O5Y2X5q2Q6Iqx5ZyS6aSQ5buz!5e0!3m2!1szh-TW!2stw!4v1594621742442!5m2!1szh-TW!2stw" frameborder="0" style="width:100%;height:40rem;padding:0; margin:0" allowfullscreen tabindex="0"></iframe>
      </div>
    </div>
    <div class="row justify-content-center m-0">
      <div class="col-12 p-0">
        <div>
          <b-card no-body>
            <b-tabs pills card vertical>
              <b-tab v-for="(tra,index) in traffic" :key='index' :title="tra.medthods" active>
                <b-card-text>
                  <ul>
                    <li class="ml-5" v-for="(de,index) in tra.des" :key="index">{{de}}</li>
                  </ul>
                </b-card-text>
              </b-tab>
            </b-tabs>
          </b-card>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
      traffic: [
        {
          medthods: '腳踏車',
          des: ['騎車到河裡', '掰', '福活', '隨便', '沒了', '騎車到河裡', '掰', '福活', '隨便', '沒了']
        },
        {
          medthods: '開車',
          des: ['開到海裡']
        },
        {
          medthods: '公車',
          des: ['沒有']
        },
        {
          medthods: '貨車',
          des: ['來個蹦蹦']
        }
      ]
    }
  },
  methods: {
    ScreenWidth () {
      return this.$store.getters.screenWidth - 800
    }
  }
}
</script>
