<template lang='pug'>
  #content
    table(cellpadding='-1' cellspacing='-1' border='1')
      tr(v-for="(cat,index) in categories" :key="index")
        td {{ cat.name }}
        td
          img(:src="cat.item1")
        td
          img(:src="cat.item2")
</template>
<script>
export default {
  data () {
    return {
      categories: [
        {
          name: '流行皮件',
          item1: './img/0403.jpg',
          item2: './img/0404.jpg'
        },
        {
          name: '流行鞋區',
          item1: './img/0405.jpg',
          item2: './img/0406.jpg'
        },
        {
          name: '流行皮夾',
          item1: './img/0407.jpg',
          item2: './img/0408.jpg'
        }
      ]
    }
  }
}
</script>>
