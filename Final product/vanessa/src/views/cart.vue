<template>
  <div id="cart">
    <div class="container">
      <h1 class="text-center mt-4 mb-4">菜單管理</h1>
      <vs-table :data="allmenu">
        <template slot="thead">
          <vs-th sort-key="title"><span class="item ">項目</span></vs-th>
          <vs-th sort-key="value"><span class="item ">價格</span></vs-th>
          <vs-th sort-key="number"><span class="item">數量</span></vs-th>
          <vs-th ><span class="item ml-lg-5 ml-4">圖片</span></vs-th>
          <vs-th ><span class="item ">動作</span></vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="tr.title">
              <span class='text'>{{tr.title}}</span>
            </vs-td>
            <vs-td :data="tr.value">
              <span class='text'>{{tr.value}}</span>
            </vs-td>
            <vs-td :data="tr.number">
              <span class='text'>{{tr.number}}</span>
              <template slot="edit">
                <vs-input type="number" v-model="tr.number" class="inputx" placeholder="數量"/>
              </template>
            </vs-td>
            <vs-td :data="tr.src">
              <div>
                <div class="image">
                  <img :src="tr.src">
                </div>
              </div>
            </vs-td>
            <vs-td :data="tr">
              <vs-button class="d-block" @click="openConfirm(tr)" color="success" type="filled"><span class="btntext">儲存</span></vs-button>
              <vs-button class="d-block" @click="openDeleteConfirm(tr)" color="danger" type="filled"><span class="btntext">刪除</span></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
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
      allcart: [],
      changecart: ''
    }
  },
  computed: {
    account () {
      return this.$store.getters.account
    }
  },
  methods: {
    openConfirm (data) {
      this.changemeal = data
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
      this.axios.post('http://localhost:3000/changecart', {
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
      this.changemeal = data
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
        text: '已順利所選項目'
      })
      this.axios.post('http://localhost:3000/deletecart', {
        id: this.changecart.id
      })
        .then(res => {
          this.$swal('完成', '已成功刪除菜單', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    }
  },
  mounted: function () {
    this.axios.post('http://localhost:3000/allcart', {
      account: this.account
    })
      .then(res => {
        this.allmenu = res.data.result.map(data => {
          return {
            title: data.title,
            value: data.value,
            type: data.type,
            description: data.description,
            src: 'http://localhost:3000' + '/images/' + data.src,
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
</style>
