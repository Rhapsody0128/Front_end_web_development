<template lang='pug'>
  #cart
    h1  購物車
    //- | {{$store.state.cart}}
    //- | {{$store.getters.cart}}
    //- 上面兩種用法官方不推薦
    b-table(:items='cart' :fields='fields')
      template(v-slot:cell(price)='data')
        |NT
        span.text-primary {{ data.value }}
      template(v-slot:cell(action)='data')
        b-btn(variant="danger" @click="delCart(data.index)") 移除
</template>
<script>
export default {
  name: 'Cart',
  data () {
    return {
      fields: [
        {
          key: 'name',
          label: '商品名'
        },
        {
          key: 'introduce',
          label: '介紹'
        },
        {
          key: 'price',
          label: '價格'
        },
        {
          key: 'action',
          label: '動作'
        }
      ]
    }
  },
  computed: {
    // 官方建議用computed使用vuex資料
    cart () {
      // 以getters取得資料
      return this.$store.getters.cart
    }
  },
  methods: {
    delCart (index) {
      this.$store.commit('delCart', index)
    }
  }
}
</script>>
