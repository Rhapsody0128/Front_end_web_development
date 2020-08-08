<template>
  <div id="back_order">
<<<<<<< Updated upstream
    <div :style="allstyle" class='all'>
    <div :style="cartorderstyle" class="row cartorder">
        <div class="col">
            <vs-table class='table' multiple v-model="selected" :data="datas">
              <template slot="header">
                <h1 class="title-lg text-center">訂單資訊</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="account" class="item ">帳號</vs-th>
                <vs-th sort-key="title" class="item ">項目</vs-th>
                <vs-th sort-key="number" class="item ">數量</vs-th>
                <vs-th sort-key="value" class="item ">單價</vs-th>
                <vs-th sort-key="id" class="item ">訂單編號</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td class="border" v-if="!data[indextr].finish" :data="data[indextr].account">
                    <span class="text">{{data[indextr].account}}</span>
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
=======
    <div class="row">
        <div class="col">
            <vs-table multiple v-model="selected" :data="datas">
              <template slot="header">
                <h1 class="title text-center">訂單資訊</h1>
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
                  <vs-td v-if="!data[indextr].finish" class="p-lg-3" :data="data[indextr].account">
                    <span class="text">{{data[indextr].account}}</span>
                  </vs-td>
                  <vs-td v-if="!data[indextr].finish" class="p-lg-3" :data="data[indextr].title">
                    <span v-for="(title,index) in data[indextr].title" :key="index" class="text">{{title}}<br></span>
                  </vs-td>
                  <vs-td v-if="!data[indextr].finish" class="p-lg-3" :data="data[indextr].number">
                    <span v-for="(number,index) in data[indextr].number" :key="index" class="text">{{number}}<br></span>
                  </vs-td>
                  <vs-td v-if="!data[indextr].finish" class="p-lg-3" :data="data[indextr].value">
                    <span v-for="(value,index) in data[indextr].value" :key="index" class="text">{{value}}<br></span>
                  </vs-td>
                  <vs-td v-if="!data[indextr].finish" class="p-lg-3" :data="data[indextr].id">
>>>>>>> Stashed changes
                    <span class="text">{{data[indextr].id}}</span>
                  </vs-td >
                </vs-tr>
              </template>
            </vs-table>
<<<<<<< Updated upstream
            <h4 class="text-right item">所選定單總價為:{{allvalue}}元</h4>
            <div class="d-flex mt-3 justify-content-center mb-5">
              <div class="col-lg-3 col-4 d-flex justify-content-center">
                <vs-button @click="openConfirm()" color="primary" type="filled">結案</vs-button>
              </div>
              <div class="col-lg-3 col-4 d-flex justify-content-center">
                <vs-button @click="openDeleteConfirm()" color="danger" type="filled">刪除</vs-button>
              </div>
              <div class="col-lg-3 col-4 d-flex justify-content-center">
                <vs-button @click='changetoggle' color="success" type="filled">已結案訂單</vs-button>
              </div>
            </div>
        </div>
    </div>
    <div :style="finishstyle" class="row finish">
        <div class="col">
            <vs-table class='table' multiple v-model="selected" :data="datas">
              <template slot="header">
                <h1 class="title text-center">已結案訂單</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="account" class="item ">帳號</vs-th>
                <vs-th sort-key="title" class="item ">項目</vs-th>
                <vs-th sort-key="number" class="item ">數量</vs-th>
                <vs-th sort-key="value" class="item ">單價</vs-th>
                <vs-th sort-key="id" class="item ">訂單編號</vs-th>
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
            <div class="d-flex mt-3 justify-content-center mb-5">
              <div class="col-lg-3 col-6 d-flex justify-content-center">
                <vs-button @click="openDeleteConfirm()" color="danger" type="filled">刪除</vs-button>
              </div>
              <div class="col-lg-3 col-6 d-flex justify-content-center">
                <vs-button @click='changetoggle' color="success" type="filled">待處理訂單</vs-button>
=======
            <h4 class="text-right">所選定單總價為:{{allvalue}}元</h4>
            <div class="d-flex mt-3 justify-content-center mb-5">
              <div class="col-lg-3 col-6 d-flex justify-content-center">
                <vs-button @click="openConfirm()" color="success" type="filled">結案</vs-button>
              </div>
              <div class="col-lg-3 col-6 d-flex justify-content-center">
                <vs-button @click="openDeleteConfirm()" color="danger" type="filled">刪除</vs-button>
>>>>>>> Stashed changes
              </div>
            </div>
        </div>
    </div>
<<<<<<< Updated upstream
    </div>
=======
>>>>>>> Stashed changes
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: '',
      datas: [],
<<<<<<< Updated upstream
      selected: [],
      allstyle: '',
      cartorderstyle: '',
      finishstyle: '',
      toggle: false
    }
  },
  methods: {
    changetoggle () {
      this.toggle = !this.toggle
      this.selected = []
      if (this.toggle) {
        this.allstyle = {
          transform: 'rotateY(180deg)'
        }
        this.cartorderstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.finishstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
      } else {
        this.allstyle = {
          transform: 'rotateY(0deg)'
        }
        this.cartorderstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
        this.finishstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
      }
    },
=======
      selected: []
    }
  },
  methods: {
>>>>>>> Stashed changes
    openConfirm () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'success',
        title: '確認結案',
        text: '確定結案訂單嗎',
        accept: this.acceptAlert
      })
    },
    acceptAlert (color) {
      if (this.selected.length < 1) {
        this.$vs.notify({
          color: 'danger',
          title: '錯誤',
          text: '未選擇結案項目'
        })
      } else {
        this.$vs.notify({
          color: 'primary',
          title: '已結案',
          text: '已順利結案所選項目'
        })
        this.selected.forEach(data => {
<<<<<<< Updated upstream
          this.axios.post(process.env.VUE_APP_APIURL + '/finishcartorder', {
=======
          this.axios.post('http://localhost:3000/finishcartorder', {
>>>>>>> Stashed changes
            id: data.id,
            finish: true
          })
            .then(res => {
              if (res.data.success) {
                this.$swal('成功', '結案成功', 'success')
<<<<<<< Updated upstream
                this.axios.post(process.env.VUE_APP_APIURL + '/allcartorder')
=======
                this.axios.post('http://localhost:3000/allcartorder')
>>>>>>> Stashed changes
                  .then(res => {
                    this.datas = res.data.result
                  })
              } else {
                this.$swal('錯誤', `${res.data.message}`, 'error')
              }
            }).catch(error => {
              this.$swal('錯誤', `${error.response.data.message}`, 'error')
            })
        })
      }
    },
    openDeleteConfirm () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: '確認刪除',
        text: '確認刪除所選項目嗎',
        accept: this.acceptDeleteAlert
      })
    },
    acceptDeleteAlert (color) {
      if (this.selected.length < 1) {
        this.$vs.notify({
          color: 'danger',
          title: '錯誤',
          text: '未選擇刪除所選項目'
        })
      } else {
        this.$vs.notify({
          color: 'primary',
          title: '已刪除',
          text: '已順利刪除所選項目'
        })
        this.selected.forEach(data => {
<<<<<<< Updated upstream
          this.axios.post(process.env.VUE_APP_APIURL + '/cancelcartorder', {
=======
          this.axios.post('http://localhost:3000/cancelcartorder', {
>>>>>>> Stashed changes
            id: data.id
          })
            .then(res => {
              if (res.data.success) {
                this.$swal('成功', '刪除成功', 'success')
<<<<<<< Updated upstream
                this.axios.post(process.env.VUE_APP_APIURL + '/allcartorder')
=======
                this.axios.post('http://localhost:3000/allcartorder')
>>>>>>> Stashed changes
                  .then(res => {
                    this.datas = res.data.result
                  })
              } else {
                this.$swal('錯誤', `${res.data.message}`, 'error')
              }
            }).catch(error => {
              this.$swal('錯誤', `${error.response.data.message}`, 'error')
            })
        })
      }
    }
  },
  computed: {
    allvalue () {
      let allvalue = 0
<<<<<<< Updated upstream
      this.selected.forEach(data => {
        for (let i = 0; i < data.value.length; i++) {
          allvalue += (parseInt(data.value[i]) * parseInt(data.number[i]))
        }
=======
      var i = 0
      this.selected.forEach(data => {
        allvalue += (parseInt(data.value[i]) * parseInt(data.number[i]))
        i++
>>>>>>> Stashed changes
      })
      return allvalue
    }
  },
  mounted: function () {
<<<<<<< Updated upstream
    this.axios.post(process.env.VUE_APP_APIURL + '/allcartorder')
=======
    this.axios.post('http://localhost:3000/allcartorder')
>>>>>>> Stashed changes
      .then(res => {
        this.datas = res.data.result
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  }
}
</script>
<style lang="stylus">
<<<<<<< Updated upstream
.all{
  transform-style: preserve-3d
  position relative
  top 0
  right 0
  left 0
  bottom 0
  margin auto
  transform: rotateY(0deg) translateZ(400px);
  transition 1s
  .cartorder{
    position: absolute;
    right 0
    left 0
    top 0
    bottom 0
    transform: rotateY(0deg) translateZ(400px);
    margin auto
    background white
    transition 0.5s
  }
  .finish{
    position: absolute;
    right 0
    left 0
    top 0
    bottom 0
    margin auto
    transform: rotateY(180deg) translateZ(400px);
    background white
    pointer-events: none
    transition 0.5s
    opacity 0
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

=======
.text{
  font-size 0.5rem
}
.item{
  font-size 1rem
}
.title{
  font-size 1.5rem
}
.vs-icon{
  font-size 0rem !important
}
@media (min-width : 768px){
.text{
  font-size 1.5rem
}
.item{
  font-size 2rem
}
.title{
  font-size 2.5rem
  }
}
>>>>>>> Stashed changes
</style>
