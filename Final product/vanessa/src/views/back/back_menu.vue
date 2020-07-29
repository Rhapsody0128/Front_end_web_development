<template>
  <div id="back_order">
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
        <vs-dropdown class="col-12">
          <vs-button class="btn-drop col-12" type="filled">{{type}}</vs-button>
          <vs-dropdown-menu class="w-25">
            <vs-dropdown-item @click='selecttype("前菜")'>前菜</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("沙拉")'>沙拉</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("主餐")'>主餐</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("披薩")'>披薩</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("湯品")'>湯品</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("甜點")'>甜點</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("鬆餅")'>鬆餅</vs-dropdown-item>
            <vs-dropdown-item @click='selecttype("飲料")'>飲料</vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
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
</div>
</template>
<script>
export default {
  data () {
    return {
      title: 'a',
      value: 12,
      type: '主餐',
      description: 'a',
      src: '',
      state: null
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
        this.$swal('完成', '已成功新增菜單', 'success')

        const fd = new FormData()
        fd.append('title', this.title)
        fd.append('value', this.value)
        fd.append('type', this.type)
        fd.append('src', this.src)
        fd.append('description', this.description)
        console.log(fd)
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
            console.log(res)
          }).catch(error => {
            this.$swal('錯誤', `${error.response.data.message}`, 'error')
          })
      }
    }
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
@media (min-width : 768px){
.text{
  font-size 1.5rem
}
.item{
  font-size 2rem
}
.title{
  font-size 2rem
  }
}
</style>
