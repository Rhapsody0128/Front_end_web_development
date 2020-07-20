<template>
  <div id="story">
    <h1 class="text-center mt-4 mb-4">關於我們</h1>
    <div :style="storystyle" class='story p-0'>
      <div class="text">
      </div>
    </div>
    <div id="flipbook" class="d-flex flex-wrap justify-content-start">
      <flipbook class="flipbook col-12 col-lg-6 p-0" :pages="array" :singlePage=true></flipbook>
      <div class="col-12 col-lg-6 pl-5 d-flex flex-column justify-content-center p-0">
        <h2>員工</h2>
        <p>asdasd</p>
      </div>
    </div>
  </div>
</template>
<script>
import Flipbook from 'flipbook-vue'
export default {
  data () {
    return {
      array: [
        '',
        '/images/9677717700_3b10b4f206_o.jpg',
        '/images/4903092900_ff43be2aff_o.jpg',
        '/images/36271782954_f7aa950180_o.jpg',
        '/images/36420482760_fe0771f10d_o.jpg',
        '/images/1472660456_1e1841d24e_o.jpg',
        '/images/9677717700_3b10b4f206_o.jpg'
      ],
      storystyle: {
        background: "url('/img/36271782954_f7aa950180_o.jpg')no-repeat fixed center/cover"
      }

    }
  },
  components: { Flipbook }
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
</style>
