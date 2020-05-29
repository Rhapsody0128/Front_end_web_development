<template lang='pug'>
  #item
    h1 商品
    b-table(:items='item' :fields='fields')
      template(v-slot:cell(price)='data')
        |NT:{{data.item.price}}
      template(v-slot:cell(buy)='data')
        b-btn(@click="addcart(data.item)")
          font-awesome-icon(:icon="['fas','shopping-cart']")
          |加入購物車
</template>

<script>
export default {
  name: 'item',
  data () {
    return {
      item: [
        {
          name: '海參',
          introduce: '好喔',
          price: 1,
          id: 1
        },
        {
          name: '麻瓜',
          introduce: '好棒喔',
          price: 20,
          id: 2
        },
        {
          name: '章魚燒',
          introduce: '好讚喔',
          price: 10,
          id: 3
        }
      ],
      fields: [
        {
          key: 'name',
          label: '商品'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'introduce',
          label: '介紹'
        },
        {
          key: 'buy',
          label: '購買'
        }
      ]
    }
  },
  methods: {
    addcart (data) {
      this.$store.commit('addcart', data)
      console.log(this.$store.state.cart)
    }
  }
}
</script>
