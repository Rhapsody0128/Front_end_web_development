<template>
<div id="news">
  <h1 class="text-center mt-4 mb-4">最新活動</h1>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <v-calendar
        :attributes='attrs'
        is-expanded
        :columns="$screens({ default: 1, lg: 2 })"
        ></v-calendar>
      </div>
    </div>
    <hr>
    <div class="row justify-content-center mt-4">
      <div class="col-12">
        <div>
  <b-tabs content-class="mt-3 mb-5" >
    <b-tab v-for="(act,index) in acts" :key="index" :title="act.title" active>
      <div class="actcard d-flex flex-wrap">
        <div class="actpic col-12 col-lg-5"><img :src="act.src">
        </div>
        <div class="acttext col-12 col-lg-6">
          <h3>{{act.title}}</h3>
          <p>{{act.des}}</p>
          </div>
        </div>
      </b-tab>
  </b-tabs>
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
      acts: [
        {
          title: '中元節',
          date: [new Date(2020, 6, 1), new Date(2020, 6, 5)],
          des: '中元節好棒棒',
          src: './images/36271782954_f7aa950180_o.jpg'
        },
        {
          title: '萬聖節',
          date: [new Date(2020, 6, 1), new Date(2020, 6, 5)],
          des: '萬聖節好棒棒',
          src: './images/4903092900_ff43be2aff_o.jpg'
        },
        {
          title: '萬聖節',
          date: [new Date(2020, 6, 1), new Date(2020, 6, 5)],
          des: '萬聖節好棒棒',
          src: './images/4903092900_ff43be2aff_o.jpg'
        },
        {
          title: '萬聖節',
          date: [new Date(2020, 6, 1), new Date(2020, 6, 5)],
          des: '萬聖節好棒棒',
          src: './images/4903092900_ff43be2aff_o.jpg'
        }
      ],
      attrs: [
        {
          key: 'today',
          highlight: 'red',
          popover: {
            label: `${new Date()}`
          },
          dates: new Date()
        },
        {
          highlight: true,
          popover: {
            label: '中元節'
          },
          dates: { start: new Date(2020, 6, 1), end: new Date(2020, 6, 5) },
          src: './images/36271782954_f7aa950180_o.jpg'
        },
        {
          highlight: 'yellow',
          popover: {
            label: '萬聖節'
          },
          dates: { start: new Date(2020, 7, 5), end: new Date(2020, 7, 25) }
        }
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
  .actcard{
    width 100%
    height 100%
    .actpic{
      width 100%
      height 100%
      img{
        width 100%
        height 100%
        object-fit cover
      }
  }

    }
</style>
