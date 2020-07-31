<template>
  <div id="back_menu">
    <form>
    <div class="row">
      <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
        <h3 class="title mb-4 col-12">餐點名稱</h3>
        <vs-input class="inputx col-12" label-placeholder="餐點名稱" v-model="title"/>
      </div>
      <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
        <h3 class="title mb-4 col-12">餐點定價</h3>
        <vs-input type="number" class="inputx col-12" label-placeholder="餐點定價" v-model="value"/>
      </div>
      <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
        <h3 class="title mb-4 col-12">餐點類型</h3>
        <b-form-select class="col-12 mt-3" v-model="type" :options="alltype"></b-form-select>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-6 col-12 mt-5 d-flex justify-content-center flex-wrap">
        <h3 class="title mb-4 col-12">餐點圖片</h3>
        <b-form-file v-model="src" :state="state" @input="validateFile" placeholder="選擇檔案或拖曳至此" drop-placeholder="將檔案拖曳至此" requiredbrowse-text="瀏覽" accept="image/*"></b-form-file>
        <p>圖片請在1MB以下</p>
      </div>
      <div class="col-lg-6 col-12 mt-5 d-flex justify-content-center flex-wrap">
        <h3 class="title mb-4 col-12">餐點描述</h3>
        <vs-textarea class="col-12" label="餐點描述" v-model="description"></vs-textarea>
      </div>
    </div>
    <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
      <div class="col-lg-2 text-right">
        <vs-button @click='addmeal' color="primary" type="filled">新增</vs-button>
      </div>
      <div class="col-lg-2 text-left">
        <vs-button color="danger" type="filled">重寫</vs-button>
      </div>
    </div>
  </form>
  <hr>
  <div class="container">
    <vs-table :data="allmenu">
      <template slot="thead">
        <vs-th sort-key="title"><span class="item">名稱</span></vs-th>
        <vs-th sort-key="value"><span class="item">價格</span></vs-th>
        <vs-th sort-key="type"><span class="item">類型</span></vs-th>
        <vs-th ><span class="item ml-5">圖片</span></vs-th>
        <vs-th ><span class="item">描述</span></vs-th>
        <vs-th ><span class="item">動作</span></vs-th>
      </template>
      <template slot-scope="{data}">
        <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
          <vs-td :data="tr.title">
            <span class='text'>{{tr.title}}</span>
            <template slot="edit">
              <vs-input v-model="tr.title" class="inputx" placeholder="名稱"/>
            </template>
          </vs-td>
          <vs-td :data="tr.value">
            <span class='text'>{{tr.value}}</span>
            <template slot="edit">
              <vs-input type="number" v-model="tr.value" class="inputx" placeholder="名稱"/>
            </template>
          </vs-td>
          <vs-td :data="tr.type">
            <span class='text'>{{tr.type}}</span>
            <template slot="edit">
              <b-form-select class="col-12 mt-3" v-model="tr.type" :options="alltype"></b-form-select>
            </template>
          </vs-td>
          <vs-td :data="tr.src">
            <div>
              <div class="image">
                <img :src="tr.src">
              </div>
            </div>
          </vs-td>
          <vs-td :data="tr.description">
            <span class='text'>{{tr.description}}</span>
            <template slot="edit">
              <vs-textarea class="col-12" label="餐點描述" v-model="tr.description"></vs-textarea>
            </template>
          </vs-td>
          <vs-td :data="tr">
            <vs-button @click="openConfirm(tr)" color="success" type="filled"><span class="text">儲存更變</span></vs-button>
            <vs-button @click="openDeleteConfirm(tr)" color="danger" type="filled"><span class="text">刪除餐點</span></vs-button>
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
      type: '類型',
      alltype: ['前菜', '沙拉', '主餐', '披薩', '湯品', '甜點', '鬆餅', '飲料'],
      select: 1,
      description: '',
      src: null,
      state: null,
      allmenu: [],
      changemeal: ''
    }
  },
  methods: {
    selecttype (type) {
      this.type = type
    },
    validateFile () {
      if (this.src != null) {
        if (this.src.size >= 1024 * 1024 || !this.src.type.includes('image')) {
          this.state = false
          this.src = null
        } else {
          this.state = true
        }
      }
    },
    addmeal () {
      if (this.title.length < 1) {
        this.$swal('錯誤', '未輸入餐點名稱', 'error')
      } else if (this.value.length < 1) {
        this.$swal('錯誤', '未輸入價格', 'error')
      } else if (this.type === '類型') {
        this.$swal('錯誤', '未選擇類型', 'error')
      } else if (this.description.length < 1) {
        this.$swal('錯誤', '無餐點描述', 'error')
      } else {
        const fd = new FormData()
        fd.append('title', this.title)
        fd.append('value', this.value)
        fd.append('type', this.type)
        fd.append('src', this.src)
        fd.append('description', this.description)
        this.title = ''
        this.value = ''
        this.type = '類型'
        this.src = null
        this.description = ''

        this.axios.post('http://localhost:3000/addmeal', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            this.$swal('完成', '已成功新增菜單', 'success')
          }).catch(error => {
            this.$swal('錯誤', `${error.response.data.message}`, 'error')
          })
      }
    },
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
      this.axios.post('http://localhost:3000/changemeal', {
        title: this.changemeal.title,
        value: this.changemeal.value,
        type: this.changemeal.type,
        id: this.changemeal.id,
        description: this.changemeal.description
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
      this.axios.post('http://localhost:3000/deletemeal', {
        id: this.changemeal.id
      })
        .then(res => {
          this.$swal('完成', '已成功刪除菜單', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    }
  },
  mounted: function () {
    this.axios.post('http://localhost:3000/allmenu')
      .then(res => {
        this.allmenu = res.data.result.map(data => {
          return {
            title: data.title,
            value: data.value,
            type: data.type,
            description: data.description,
            src: 'http://localhost:3000' + '/images/menu/' + data.src,
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
}
.material-icons{
  font-size 0px !important
  background red
}
</style>
