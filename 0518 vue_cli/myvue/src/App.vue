<template>
  <div id="app">
    <h1>{{text}}</h1>
    <div id="cards">
      <Card v-for="(card,index) in cards" :key="index" :data="card"></Card>
    </div>
  </div>
</template>

<script>
import Card from './components/Card.vue'

export default {
  data () {
    return {
      text: '攝影作品',
      cards: [
        {
          img: 'https://picsum.photos/400/200/?random=1',
          title: '作品一'
        },
        {
          img: 'https://picsum.photos/400/200/?random=2',
          title: '作品二'
        },
        {
          img: 'https://picsum.photos/400/200/?random=3',
          title: '作品三'
        },
        {
          img: 'https://picsum.photos/400/200/?random=4',
          title: '作品四'
        },
        {
          img: 'https://picsum.photos/400/200/?random=5',
          title: '作品五'
        },
        {
          img: 'https://picsum.photos/400/200/?random=6',
          title: '作品六'
        }
      ]
    }
  },
  components: {
    Card
  }

}
</script>
<style>

</style>
