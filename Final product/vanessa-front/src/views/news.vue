<template>
<div id="news">
  <h1 class="text-center mt-4 mb-4">最新活動</h1>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <v-calendar
        :attributes='allevent'
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
            <b-tab v-for="(event,index) in allevent" :key="index" :title="event.title" active>
              <div class="actcard d-flex flex-wrap">
                <div class="actpic col-12 col-lg-5"><img :src="event.src">
                </div>
                <div class="acttext col-12 col-lg-6 ">
                  <div>
                    <h3 >{{event.title}}</h3>
                    <p >{{event.description}}</p>
                  </div>
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
      allevent: []
    }
  },
  mounted: function () {
    this.axios.post(process.env.VUE_APP_APIURL + '/allevent')
      .then(res => {
        this.allevent = res.data.result.map(data => {
          return {
            highlight: data.color,
            dates: {
              start: new Date(data.startyear, data.startmonth - 1, data.startday),
              end: new Date(data.endyear, data.endmonth - 1, data.endday)
            },
            popover: {
              label: data.title
            },
            title: data.title,
            description: data.description,
            src: 'process.env.VUE_APP_APIURL' + '/images/' + data.src
          }
        })
      })
      .catch(error => {
        console.log(error.response.data.message)
      })
  }
}
</script>
<style lang="stylus" scoped>
  .actcard{
    width 100%
    height 100%
    .actpic{
      width 100%
      img{
        width 100%
        height 100%
        object-fit cover
      }
    }
    .acttext{
      display flex
      justify-content center
      align-items center
      text-align center
    }
  }
</style>
