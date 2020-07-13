<template>
  <div id="story">
    <div class="container-fulid">
      <h1 class="text-center mt-4 mb-4">關於我們</h1>
      <div  v-for="(story,index) in stories" :key="index" class="row stories">
        <div class="story col-12 p-0 d-flex flex-wrap justify-content-around">
          <div class="stroypic col-12 col-lg-4">
            <img :src="story.src" alt="">
          </div>
          <div class="stoyetext col-12 col-lg-4 mt-5">
            <h3 v-text='story.title'></h3>
            <p v-text='story.des'></p>
          </div>
        </div>
        <div class="col-12 mb-5 mt-5">
          <div class='line'></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      stories: [
        {
          src: '/img/36420482760_fe0771f10d_o.jpg',
          title: '餐廳環境',
          des: '明亮的餐廳，溫暖的配色，適合舒服下午的最佳好地點'
        }, {
          src: '/img/36420482760_fe0771f10d_o.jpg',
          title: '餐廳環境',
          des: '明亮的餐廳，溫暖的配色，適合舒服下午的最佳好地點'
        }, {
          src: '/img/36420482760_fe0771f10d_o.jpg',
          title: '餐廳環境',
          des: '明亮的餐廳，溫暖的配色，適合舒服下午的最佳好地點'
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.container{
  height 100%
}
  .story:nth-child(odd){
    background transparent
    width 100%
    border 0
    height 20%
    .stroypic:nth-child(odd){
      width 100%
      height 100%
      order 0
      img{
        width 100%
        height 100%
        object-fit cover
      }
    }
    .stroytext{
      text-align center
    }
  }
  .line{
    margin auto
    width 100%
    height 0.1rem
    background rgba(0,0,0,0.2)
    display flex
    justify-content center
  }
  .line:after{
    content ''
    width 2rem
    height 2rem
    background rgba(0,0,0,0.2)
    border-radius 50%
    position absolute
    transform translate(-50%,-50%)
  }
  .line:before{
    content ''
    width 2rem
    height 2rem
    background rgba(0,0,0,0.2)
    border-radius 25%
    position absolute
    transform translate(-50%,-50%)
  }
</style>
