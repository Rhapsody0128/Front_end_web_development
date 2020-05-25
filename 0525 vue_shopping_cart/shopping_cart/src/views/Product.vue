<template lang="pug">
  #product
    h1 Product
    //- items=表格資料的陣列 fields是欄位設定陣列
    b-table(:items='products' :fields='fields')
      template(v-slot:cell(price)='data')
        |NT
        span.text-primary {{ data.value }}
      template(v-slot:cell(action)='data')
        b-btn(variant="success" @click="addCart(data.item)") 加入購物車
</template>
<script>
export default {
  name: 'product',
  data () {
    return {
      products: [
        {
          name: 'amiibo 動物森友會(動物之森) 傅達 貓頭鷹公仔',
          introduce: `附加大網袋及10個卡帶收納夾層
                Switch/Switch Lite 大小通用設
                手提便攜設計 內襯超細纖維布`,
          price: 590,
          id: 1
        },
        {
          name: '任天堂 Switch Pro無線震動控制器',
          introduce: `「人體工學」舒適握感 全功能手把控制器
                  ▉ 長時間遊玩也能擁有完美舒適度
                  ▉ 無線藍牙功能 享受大螢幕遊玩體驗
                  ▉ 附攝影按鍵功能 珍藏喜愛遊戲畫面
                  ▉ HD震動設計 更豐富的遊戲投入感
                  展碁公司貨，提供1年保固`,
          price: 2390,
          id: 2
        },
        {
          name: 'Switch防摔手提硬殼包 ',
          introduce: `支援對應Switch、3DS、Wii U！
                  ▉ 多款可對應遊戲！盡享樂趣！
                  ▉ 遊戲玩法互動，體驗各種趣味機能
                  ▉ 內建NFC，支援遊戲互動！
                  ▉ 可當收藏品擺飾，增添個人風格`,
          price: 289,
          id: 3
        }
      ],
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
  methods: {
    addCart (data) {
      // 呼叫vuex名為addCart的mutations
      // 將近來method的資料傳過去
      this.$store.commit('addCart', data)
    }
  }
}
</script>
