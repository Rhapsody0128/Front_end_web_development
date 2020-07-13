<template>
  <div id="story">
    <div class="container">
      <h1 class="text-center mt-4 mb-4">Story</h1>
      <div v-for="(story,index) in stories" :key="index" class="row ">
        <div class="card col-12">
          <img :src="story.src" alt="">
          <p v-text='story.des'></p>
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
          des: 'asdasdasdsad'
        }, {
          src: '/img/36420482760_fe0771f10d_o.jpg',
          des: 'asdasdasdsad'
        }, {
          src: '/img/36420482760_fe0771f10d_o.jpg',
          des: 'asdasdasdsad'
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
  .card:nth-child(odd){
    background transparent
    width 100%
    border 0
    height 20%
    img{
      width 100%
      height 100%
      object-fit cover
    }
    p{
      text-align center
    }
  }
  .card:nth-child(even){
    background red
    width 100%
    border 0
    height 20%
    img{
      width 100%
      height 100%
      object-fit cover
    }
    p{
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
