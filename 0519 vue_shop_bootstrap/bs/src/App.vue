<template lang='pug'>
#app
  //- .container
  //-   .row
  //-     .col-3.bg-success
  //-     .col-3.bg-danger
  //-     .col-3.bg-warning
  //-     .col-3.bg-primary
  //- br
  //- b-container(fluid)
  //-   b-row
  //-     b-col.bg-success(cols='3')
  //-     b-col.bg-danger(cols='3')
  //-     b-col.bg-warning(cols='3')
  //-     b-col.bg-primary(cols='3')
  //- br
  //- b-container
  //-   b-row(align-h='center')
  //-     b-col.bg-success(cols='12' md='6' lg='3')
  //-     b-col.bg-danger(cols='12' md='6' lg='3')
  //-     b-col.bg-warning(cols='12' md='6' lg='3')
  //-     b-col.bg-primary(cols='12' md='6' lg='3')
  b-container
    b-row(align-h='center')
      b-col.d-flex.my-2.zack(cols='12' md='6' lg='4' xl='3' v-for="(card,index) in cards" :key="index")
        b-card(:img-src="card.image" img-top)
            b-card-text {{card.description}}
            b-btn(variant="primary" pill :href="card.link")
              font-awesome-icon(:icon="['fas','address-card']")
              | 貼文連結

</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      cards: []
    }
  },
  mounted () {
    this.axios.get('https://api.kento520.tw/zack/')
      .then(result => {
        const rand = Math.floor(Math.random() * 852)
        console.log(rand)
        this.cards = result.data
        console.log(this.cards)
      })
  }
}
</script>
