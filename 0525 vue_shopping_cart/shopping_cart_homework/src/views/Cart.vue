<template lang='pug'>
#cart
  h1 購物車
  b-table(:items='cart' :fields='fields')
    template(v-slot:cell(buy)='data')
        b-btn(@click="delcart(data.index)")
          font-awesome-icon(:icon="['fas','window-close']")
          |取消購買
</template>
<script>
export default {
  data () {
    return {
      name: 'cart',
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
  computed: {
    cart () {
      return this.$store.getters.cart
    },
    total () {
      const i = 0
      return i
    }
  },
  methods: {
    delcart (index) {
      this.$store.commit('delcart', index)
    }
  }
}
</script>
