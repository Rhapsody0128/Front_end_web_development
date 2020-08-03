<template>
  <div id="market">
    <h1 class="text-center mt-4 mb-4">購物廣場</h1>
    <div class="row justify-content-center m-0">
      <div class="col-10 col-lg-2 ">
        <b-form-group>
          <template v-slot:label>
            <br >
            <b-form-checkbox
              v-model="allSelected"
              :indeterminate="indeterminate"
              @change="toggleAll"
              checked=true
            >{{ allSelected ? '取消全選' : '全選' }}</b-form-checkbox>
          </template>
          <b-form-checkbox-group
            id="flavors"
            v-model="selected"
            :options="flavours"
            name="flavors"
            class="ml-4 d-lg-flex flex-lg-nowrap flex-lg-column"
            size="lg"
            :stacked='ScreenWidth>768'
          ></b-form-checkbox-group>
        </b-form-group>
      </div>
      <div id="showmarket" class="col-12 col-lg-8 d-flex justify-content-start flex-wrap">
        <div class="mealcard d-flex" v-for="(item,index) in market" :key="index">
          <transition name="fade">
            <div @click="item.popupActivo=true;number=null" v-if="selected.includes(item.type)">
              <div class="itempic">
                <img :src="item.src"></div>
              <div class="itemdes text-center">{{item.title}}</div>
            </div>
          </transition>
          <vs-popup class="holamundo text-center" @click="clearnumber" :title=item.title :active.sync="item.popupActivo">
            <img class="bigpic" :src="item.src">
            <h3>{{item.description}}</h3>
            <h4>價格:{{item.value}}元</h4>
            <vs-button class="mb-1" @click="additem(item.id,number,item.stock,item.title,item.value,item.src)" color="success" type="filled">加入購物車</vs-button>
            <vs-input type="number" v-model="number" class="inputx m-auto" placeholder="數量"/>
          </vs-popup>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      popupActivo: false,
      flavours: ['手工蛋糕', '餅乾', '布丁', '蔬菜', '水果', '甜點'],
      selected: ['手工蛋糕', '餅乾', '布丁', '蔬菜', '水果', '甜點'],
      allSelected: true,
      indeterminate: false,
      market: [],
      number: null,
      test: 13
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ? this.flavours.slice() : []
    },
    additem (id, number, stock, title, value, src) {
      if (this.account.length < -1) {
        this.$swal('錯誤', '請先登入會員', 'error')
        this.$router.push('/member')
      } else {
        if (number === null || number < 1) {
          this.$swal('錯誤', '請確認數量', 'error')
        } else if (stock < number) {
          this.$swal({
            title: '庫存不足，',
            text: `目前庫存量為${stock}，是否依然需要下訂?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '確定',
            cancelButtonText: '取消'
          }).then((result) => {
            if (result.value) {
              this.axios.post('http://localhost:3000/addcart', {
                itemid: id,
                account: this.account,
                title: title,
                number: number,
                value: value,
                src: src,
                buying: true
              })
                .then(res => {
                  this.$swal('確認', '已收到您的訂單，會盡速幫您處裡', 'success')
                  console.log(res)
                })
                .catch(error => {
                  console.log(error.response.data.message)
                })
            }
          })
        } else {
          this.axios.post('http://localhost:3000/addcart', {
            itemid: id,
            account: this.account,
            title: title,
            number: number,
            value: value,
            src: src,
            buying: true
          })
            .then(res => {
              this.$swal('確認', '已成功加入購物車', 'success')
              console.log(res)
            })
            .catch(error => {
              console.log(error.response.data.message)
            })
        }
      }
    },
    clearnumber () {
      this.number = null
    },
    ScreenWidth () {
      return this.$store.getters.screenWidth
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    }
  },
  watch: {
    selected (newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.flavours.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  },
  mounted: function () {
    this.axios.post('http://localhost:3000/allmarket')
      .then(res => {
        this.market = res.data.result.map(data => {
          return {
            title: data.title,
            value: data.value,
            type: data.type,
            description: data.description,
            src: 'http://localhost:3000' + '/images/' + data.src,
            stock: data.stock,
            popupActivo: false,
            id: data.id
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
  .bigpic{
    width 80%
    height 80%
  }
  .itempic{
    width 10rem
    height 10rem
    img{
      border-radius:50%
      width 100%
      height 100%
      object-fit cover
      padding 1rem
    }
  }
  .itemdes{
    width 8rem
    height 8rem
    padding 1rem
    margin auto
    }
    @media (min-width : 768px) {
      .itempic{
        width 15rem
        height 15rem
      }
      .itemdes{
      width 12rem
      height 12rem
      font-size 1.2rem
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
    .holamundo{
      z-index 1
    }
</style>
