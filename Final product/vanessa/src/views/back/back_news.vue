<template>
  <div id="back_news">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動日期</h3>
          <v-date-picker class="w-100 col-12" mode='range' v-model='range'/>
        </div>
        <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">月曆圓點顏色</h3>
          <vs-button class="col-3" @click="pickcolor('red')" color="red" type="border"><span>紅色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('orange')" color="orange" type="border"><span>橙色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('yellow')" color="yellow" type="border"><span>黃色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('green')" color="green" type="border"><span>綠色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('blue')" color="blue" type="border"><span>藍色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('purple')" color="purple" type="border"><span>紫色</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('pink')" color="pink" type="border"><span>粉紅</span></vs-button>
          <vs-button class="col-3" @click="pickcolor('gray')" color="gray" type="border"><span>灰色</span></vs-button>
        </div>
        <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動標題</h3>
          <vs-input class="inputx col-12" label-placeholder="活動標題" v-model="title"/>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動圖片</h3>
          <b-form-file v-model="src" :state="state" @input="validateFile" placeholder="選擇檔案或拖曳至此" drop-placeholder="將檔案拖曳至此" requiredbrowse-text="瀏覽" accept="image/*"></b-form-file>
          <p>圖片請在1MB以下</p>
        </div>
        <div class="col-lg-6 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動描述</h3>
          <vs-textarea class="col-12" label="活動描述" v-model="description"></vs-textarea>
        </div>
      </div>
      <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
        <div class="col-lg-2 text-right">
          <vs-button @click='addevent' color="primary" type="filled">新增</vs-button>
        </div>
        <div class="col-lg-2 text-left">
          <vs-button color="danger" type="filled">重寫</vs-button>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      color: '',
      title: '',
      description: '',
      range: {
        start: new Date(),
        end: new Date()
      }
    }
  },
  methods: {
    pickcolor (color) {
      this.color = color
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
    addevent () {
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
    }
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
.table{
  border 1px black solid
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
.picitem{
  margin auto
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
