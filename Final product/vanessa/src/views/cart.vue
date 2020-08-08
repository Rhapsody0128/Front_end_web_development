<template>
  <div id="cart">
    <h1 class="text-center mt-4 mb-4 bigtitle">購物車</h1>
    <div :style="allstyle" class="container all">
      <div :style="cartstyle" class="cart">
        <h2 class="text-center mt-4 mb-4 title-lg">未送出訂單</h2>
        <vs-table :data="cart">
          <template slot="thead">
            <vs-th sort-key="title">
              <span class="item">項目</span>
            </vs-th>
            <vs-th sort-key="value">
              <span class="item">單價</span>
            </vs-th>
            <vs-th sort-key="value">
              <span class="item">價格</span>
            </vs-th>
            <vs-th sort-key="number">
              <span class="item">數量</span>
            </vs-th>
            <vs-th>
              <span class="item">圖片</span>
            </vs-th>
            <vs-th>
              <span class="item">動作</span>
            </vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td v-if="tr.buying" :data="tr.title">
                <span class="text">{{tr.title}}</span>
              </vs-td>
              <vs-td v-if="tr.buying" :data="tr.value">
                <span class="text">{{tr.value}}</span>
              </vs-td>
              <vs-td v-if="tr.buying" :data="tr">
                <span class="text">{{tr.value*tr.number}}</span>
              </vs-td>
              <vs-td v-if="tr.buying" :data="tr.number">
                <span class="text">{{tr.number}}</span>
                <template slot="edit">
                  <vs-input type="number" v-model="tr.number" class="inputx" placeholder="數量" />
                </template>
              </vs-td>
              <vs-td v-if="tr.buying" :data="tr.src">
                <div>
                  <div class="image">
                    <img :src="tr.src" />
                  </div>
                </div>
              </vs-td>
              <vs-td v-if="tr.buying" :data="tr">
                <vs-button class="d-block" @click="openConfirm(tr)" color="success" type="filled">
                  <span class="btntext">儲存</span>
                </vs-button>
                <vs-button
                  class="d-block"
                  @click="openDeleteConfirm(tr)"
                  color="danger"
                  type="filled">
                  <span class="btntext">刪除</span>
                </vs-button>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="row justify-content-end mt-3 mb-3">
          <h4 class="text-right mr-5">總品項數量:{{allnumber}}</h4>
          <h4 class="text-right">總品項價格:{{allvalue}}</h4>
        </div>
        <div class="row justify-content-center">
          <div class="col-6 col-lg-2 d-flex justify-content-center">
            <vs-button @click="buy" color="success" type="filled">
              <span class="btntext">購買</span>
            </vs-button>
          </div>
          <div class="col-6 col-lg-2 d-flex justify-content-center">
            <vs-button @click="clear" color="danger" type="filled">
              <span class="btntext">清空</span>
            </vs-button>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(3)" class=" btn btn-light mt-5 mb-5">訂單查詢</button>
          </div>
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(2)" class=" btn btn-light mt-5 mb-5">訂購紀錄</button>
          </div>
        </div>
      </div>
      <div :style="orderingstyle" class="ordering">
        <h2 class="text-center mt-4 mb-4 title-lg">訂購紀錄</h2>
        <vs-table :data="cart">
          <template slot="thead">
            <vs-th sort-key="title">
              <span class="item">項目</span>
            </vs-th>
            <vs-th sort-key="value">
              <span class="item">單價</span>
            </vs-th>
            <vs-th sort-key="value">
              <span class="item">價格</span>
            </vs-th>
            <vs-th sort-key="number">
              <span class="item">數量</span>
            </vs-th>
            <vs-th>
              <span class="item">圖片</span>
            </vs-th>
            <vs-th>
              <span class="item">清除</span>
            </vs-th>
          </template>
          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td v-if="tr.buying!=true" :data="tr.title">
                <span class="text">{{tr.title}}</span>
              </vs-td>
              <vs-td v-if="tr.buying!=true" :data="tr.value">
                <span class="text">{{tr.value}}</span>
              </vs-td>
              <vs-td v-if="tr.buying!=true" :data="tr">
                <span class="text">{{tr.value*tr.number}}</span>
              </vs-td>
              <vs-td v-if="tr.buying!=true" :data="tr.number">
                <span class="text">{{tr.number}}</span>
              </vs-td>
              <vs-td v-if="tr.buying!=true" :data="tr.src">
                <div>
                  <div class="image">
                    <img :src="tr.src" />
                  </div>
                </div>
              </vs-td>
              <vs-td v-if="tr.buying!=true" :data="tr">
                <div class="p-5">
                  <vs-button
                  class="d-block"
                  @click="openDeleteConfirm(tr)"
                  color="danger"
                  type="filled">
                  <span class="btntext">清除</span>
                </vs-button>
                </div>
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
        <div class="row justify-content-center">
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(1)" class=" btn btn-light mt-5 mb-5">購物車</button>
          </div>
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(3)" class=" btn btn-light mt-5 mb-5">訂單查詢</button>
          </div>
        </div>
      </div>
      <div :style="historystyle" class="history">
        <h2 class="text-center mt-4 mb-4">訂單查詢</h2>

      <div class="row">
        <div class="col">
            <vs-table class='table' :data="history">
              <template slot="header">
                <h1 class="title text-center">處理中訂單</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="account" class="item p-lg-3">帳號</vs-th>
                <vs-th sort-key="title" class="item p-lg-3">項目</vs-th>
                <vs-th sort-key="number" class="item p-lg-3">數量</vs-th>
                <vs-th sort-key="value" class="item p-lg-3">單價</vs-th>
                <vs-th sort-key="id" class="item p-lg-3">訂單編號</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td class="border" v-if="!data[indextr].finish" :data="data[indextr].account">
                    <span  class="text">{{data[indextr].account}}</span>
                  </vs-td>
                  <vs-td class="border tableform" v-if="!data[indextr].finish" :data="data[indextr].title">
                    <div v-for="(title,index) in data[indextr].title" :key="index" class="text">{{title}}<br></div>
                  </vs-td>
                  <vs-td class="border tableform" v-if="!data[indextr].finish" :data="data[indextr].number">
                    <div v-for="(number,index) in data[indextr].number" :key="index" class="text">{{number}}<br></div>
                  </vs-td>
                  <vs-td class="border tableform" v-if="!data[indextr].finish" :data="data[indextr].value">
                    <div v-for="(value,index) in data[indextr].value" :key="index" class="text">{{value}}<br></div>
                  </vs-td>
                  <vs-td v-if="!data[indextr].finish" :data="data[indextr].id">
                    <span  class="text">{{data[indextr].id}}</span>
                  </vs-td >
                </vs-tr>
              </template>
            </vs-table>
        </div>
      </div>
      <div class="row">
        <div class="col">
            <vs-table class='table' :data="history">
              <template slot="header">
                <h1 class="title text-center">已處理訂單</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="account" class="item p-lg-3">帳號</vs-th>
                <vs-th sort-key="title" class="item p-lg-3">項目</vs-th>
                <vs-th sort-key="number" class="item p-lg-3">數量</vs-th>
                <vs-th sort-key="value" class="item p-lg-3">單價</vs-th>
                <vs-th sort-key="id" class="item p-lg-3">訂單編號</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td class="border" v-if="data[indextr].finish" :data="data[indextr].account">
                    <span  class="text">{{data[indextr].account}}</span>
                  </vs-td>
                  <vs-td class="border tableform" v-if="data[indextr].finish" :data="data[indextr].title">
                    <div v-for="(title,index) in data[indextr].title" :key="index" class="text">{{title}}<br></div>
                  </vs-td>
                  <vs-td class="border tableform" v-if="data[indextr].finish" :data="data[indextr].number">
                    <div v-for="(number,index) in data[indextr].number" :key="index" class="text">{{number}}<br></div>
                  </vs-td>
                  <vs-td class="border tableform" v-if="data[indextr].finish" :data="data[indextr].value">
                    <div v-for="(value,index) in data[indextr].value" :key="index" class="text">{{value}}<br></div>
                  </vs-td>
                  <vs-td v-if="data[indextr].finish" :data="data[indextr].id">
                    <span  class="text">{{data[indextr].id}}</span>
                  </vs-td >
                </vs-tr>
              </template>
            </vs-table>
        </div>
      </div>
        <div class="row justify-content-center">
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(1)" class=" btn btn-light mt-5 mb-5">購物車</button>
          </div>
          <div class="col-lg-2 col-6 d-flex justify-content-center">
            <button @click="changetoggle(2)" class=" btn btn-light mt-5 mb-5">訂購紀錄</button>
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
      title: '',
      value: '',
      number: null,
      src: null,
      cart: [],
      changecart: '',
      allstyle: {},
      cartstyle: {},
      orderingstyle: {},
      historystyle: {},
      block: true,
      cartorder: {
        account: '',
        itemid: [],
        title: [],
        number: [],
        value: [],
        src: [],
        buying: '',
        finish: ''
      },
      history: []
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    },
    allnumber () {
      let allnumber = 0
      this.cart.forEach(data => {
        if (data.buying) {
          allnumber += parseInt(data.number)
        }
      })
      return allnumber
    },
    allvalue () {
      let allvalue = 0
      this.cart.forEach(data => {
        if (data.buying) {
          allvalue += parseInt(data.number) * parseInt(data.value)
        }
      })
      return allvalue
    }

  },
  methods: {
    openConfirm (data) {
      this.changecart = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: '確認更變',
        text: '確認更變項目嗎',
        accept: this.acceptAlert
      })
    },
    acceptAlert (color) {
      this.$vs.notify({
        color: 'primary',
        title: '已順利更變',
        text: '已順利所選項目'
      })
      this.axios.post(process.env.VUE_APP_APIURL + '/changecart', {
        number: this.changecart.number,
        id: this.changecart.id
      })
        .then(res => {
          this.$swal('完成', '已成功更變菜單', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    },
    openDeleteConfirm (data) {
      this.changecart = data
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: '確認刪除',
        text: '確認刪除項目嗎',
        accept: this.acceptDeleteAlert
      })
    },
    acceptDeleteAlert (color) {
      this.$vs.notify({
        color: 'primary',
        title: '已順利刪除',
        text: '已順利刪除所選項目'
      })
      this.axios.post(process.env.VUE_APP_APIURL + '/deletecart', {
        id: this.changecart.id
      })
        .then(res => {
          this.$swal('完成', '已成功刪除商品', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    },
    buy () {
      this.$swal({
        title: '購買確認',
        text: `總共${this.allvalue}元，是否確定送出?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          this.cart.forEach(data => {
            if (data.number < 1) {
              this.block = false
              this.$swal('錯誤', '商品數量不能為負數或零', 'error')
            }
          })
          const judge = this.cart.filter(data => {
            return data.buying === true
          })
          if (judge.length > 0) {
            if (this.block) {
              this.block = true
              this.cart.forEach(data => {
                if (data.buying) {
                  this.axios.post(process.env.VUE_APP_APIURL + '/buyingcart', {
                    id: data.id,
                    buying: false
                  })
                    .catch(error => {
                      this.$swal('錯誤', `${error.response.data.message}`, 'error')
                    })
                }
              })
              this.cartorder.account = this.account
              this.cartorder.buying = false
              this.cartorder.finish = false
              this.cart.forEach(data => {
                if (data.buying) {
                  this.cartorder.itemid.push(data.itemid)
                  this.cartorder.title.push(data.title)
                  this.cartorder.number.push(parseInt(data.number))
                  this.cartorder.value.push(data.value)
                  this.cartorder.src.push(data.src)
                }
              })
              this.axios.post(process.env.VUE_APP_APIURL + '/cartorder', this.cartorder)
                .then(res => {
                  this.$swal('確認', `已收到您的訂單，您的訂單編號為${res.data.result.id}`, 'success')
                  this.cartorder = {
                    account: '',
                    itemid: [],
                    title: [],
                    number: [],
                    value: [],
                    src: [],
                    buying: '',
                    finish: ''
                  }
                })
                .catch(error => {
                  this.$swal('錯誤', `${error.response.data.message}`, 'error')
                })
            }
          } else {
            this.$swal('錯誤', '購物車沒有商品', 'error')
          }
        }
      })
    },
    clear () {
      this.$swal({
        title: '清空',
        text: '確定要清空購物車?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '確定',
        cancelButtonText: '取消'
      }).then((result) => {
        if (result.value) {
          const judge = this.cart.filter(data => {
            return data.buying === true
          })
          if (judge.length > 0) {
            this.cart.forEach(data => {
              if (data.buying) {
                this.axios.post(process.env.VUE_APP_APIURL + '/clearcart', { account: this.account, buying: data.buying })
                  .then(res => {
                    this.$swal('完成', '已清空購物車', 'success')
                  }).catch(error => {
                    this.$swal('錯誤', `${error.response.data.message}`, 'error')
                  })
              }
            })
          } else {
            this.$swal('錯誤', '購物車沒有商品', 'error')
          }
        }
      })
    },
    changetoggle (value) {
      if (value === 1) {
        this.allstyle = {
          transform: 'rotateY(0deg)'
        }
        this.cartstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
        this.orderingstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.historystyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
      } else if (value === 2) {
        this.allstyle = {
          transform: 'rotateY(240deg)'
        }
        this.cartstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.orderingstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
        this.historystyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
      } else {
        this.allstyle = {
          transform: 'rotateY(-240deg)'
        }
        this.cartstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.orderingstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.historystyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
      }
    }
  },
  mounted: function () {
    this.$store.commit('boxshow')
    this.axios.post(process.env.VUE_APP_APIURL + '/getusercartorder', {
      account: this.account
    })
      .then(res => {
        this.history = res.data.result
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
    this.axios.post(process.env.VUE_APP_APIURL + '/getusercart', {
      account: this.account
    })
      .then(res => {
        this.cart = res.data.result.map(data => {
          return {
            itemid: data.id,
            account: data.account,
            title: data.title,
            number: data.number,
            value: data.value,
            src: data.src,
            buying: data.buying,
            id: data.id
          }
        })
      })
      .catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  }
}
</script>
<style lang="stylus">
.btntext{
  font-size 0.2rem !important
}
.text{
  font-size 0.5rem
}
.item{
  font-size 1rem
}
.title{
  font-size 1.5rem
}
.image{
  width 5rem
  height 5rem
  img{
    object-fit cover
    width 100%
    height 100%
    border-radius 50%
  }
}
.vs-table-text{
  text-align center
  margin auto
}
.material-icons{
    font-size 0px !important
    background red
}
  .all{
    transform-style: preserve-3d
    position relative
    top 0
    right 0
    left 0
    bottom 0
    margin auto
    transform: rotateY(0deg)
    transition 1s
    .cart{
      position: absolute;
      right 0
      left 0
      top 0
      bottom 0
      margin auto
      background white
      transform: rotateY(0deg) translateZ(400px)
      transition 0.5s
    }
    .ordering{
      position: absolute;
      right 0
      left 0
      top 0
      bottom 0
      margin auto
      transform: rotateY(120deg) translateZ(400px)
      background white
      pointer-events: none
      transition 0.5s
      opacity 0
    }
    .history{
      position: absolute;
      right 0
      left 0
      top 0
      bottom 0
      margin auto
      transform: rotateY(-120deg) translateZ(400px)
      background white
      pointer-events: none
      transition 0.5s
      opacity 0
    }
  }
  .toggle{
    margin auto
  }
@media (min-width : 768px){
  .image{
  width 10rem
  height 10rem
  }
  .text{
    font-size 1.5rem
    margin auto
  }
  .item{
    font-size 2rem
  }
  .title{
    font-size 2rem
    }
  .btntext{
    font-size 1rem !important
  }
}
.tableform{
  span{
    display flex !important
    flex-wrap wrap !important
    .text{
      width 100%
    }
  }
}
</style>
