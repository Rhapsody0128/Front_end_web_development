<template>
  <div id="back_order">
    <div class="row">
        <div class="col">
            <vs-table multiple v-model="selected" :data="datas">
              <template slot="header">
                <h1 class="title-lg text-center ">訂位資訊</h1>
              </template>
              <template slot="thead">
                <vs-th sort-key="name" class="item">姓名</vs-th>
                <vs-th sort-key="phone" class="item">電話</vs-th>
                <vs-th sort-key="peoplecount" class="item">人數</vs-th>
                <vs-th sort-key="date" class="item">日期</vs-th>
                <vs-th sort-key="time" class="item">時間</vs-th>
                <vs-th sort-key="remarks" class="item">備註</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].name">
                    <span class="text">{{data[indextr].name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].phone">
                    <span class="text">{{data[indextr].phone}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].peoplecount">
                    <span class="text">{{data[indextr].peoplecount}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].date">
                    <span class="text">{{data[indextr].date}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].time">
                    <span class="text">{{data[indextr].time}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].remarks">
                    <span class="text">{{data[indextr].remarks}}</span>
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
          this.axios.post(process.env.VUE_APP_APIURL + '/cancelorder', {
            account: data.account
          })
            .then(res => {
              if (res.data.success) {
                this.$swal('成功', '取消成功', 'success')
                this.axios.post(process.env.VUE_APP_APIURL + '/allorder')
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
    this.axios.post(process.env.VUE_APP_APIURL + '/allorder')
      .then(res => {
        this.datas = res.data.result
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  }
}
</script>
<style lang="stylus">
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
