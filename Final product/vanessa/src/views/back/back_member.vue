<template>
  <div id="back_member">
    <div class="row">
        <div class="col">
            <vs-table multiple v-model="selected" :data="datas">
              <template slot="header">
                <h1 class="title text-center">會員資訊</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="name" class="item">姓名</vs-th>
                <vs-th sort-key="account" class="item">帳號</vs-th>
                <vs-th sort-key="phone" class="item">電話</vs-th>
                <vs-th sort-key="email" class="item">信箱</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].name">
                    <span class="text">{{data[indextr].name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].account">
                    <span class="text">{{data[indextr].account}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].phone">
                    <span class="text">{{data[indextr].phone}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].email">
                    <span class="text">{{data[indextr].email}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <div class="d-flex mt-3 justify-content-center">
              <vs-button @click="openConfirm()" color="danger" type="filled">刪除</vs-button>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      index: '',
      datas: [],
      selected: []
    }
  },
  methods: {
    openConfirm () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: '確認刪除',
        text: '確認刪除所選項目嗎',
        accept: this.acceptAlert
      })
    },
    acceptAlert (color) {
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
          this.axios.post('http://localhost:3000/deleteuser', {
            account: data.account
          })
            .then(res => {
              if (res.data.success) {
                this.$swal('成功', '取消成功', 'success')
                this.axios.post('http://localhost:3000/alluser')
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
  mounted: function () {
    this.axios.post('http://localhost:3000/alluser')
      .then(res => {
        this.datas = res.data.result
        console.log(this.datas)
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  }
}
</script>
<style lang="stylus" scoped>
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
</style>
