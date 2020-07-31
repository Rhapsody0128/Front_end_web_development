<template>
  <div id="back_news">
    <div class="container">
      <div class="row">
        <div class="col-lg-4 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動標題</h3>
          <vs-input class="inputx col-12" label-placeholder="活動標題" v-model="title"/>
        </div>
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
          <div :style="pickcolorstyle" class="col-12 pickcolorstyle d-flex justify-content-center align-items-center">目前選擇顏色</div>
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
    </div>
    <hr>
    <div class="container">
      <vs-table :data="allevent">
        <template slot="thead">
          <vs-th sort-key="title"><span class="item">活動</span></vs-th>
          <vs-th sort-key="color"><span class="item">顏色</span></vs-th>
          <vs-th sort-key="range"><span class="item">日期</span></vs-th>
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
            <vs-td :data="tr.color">
              <div class='tablecolorstyle'>{{tr.color}}</div>
              <template slot="edit">

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
      color: 'sad',
      pickcolorstyle: {},
      state: null,
      title: 'asd',
      src: null,
      description: 'sad',
      range: {
        start: new Date(),
        end: new Date()
      },
      allevent: ''
    }
  },
  methods: {
    pickcolor (color) {
      this.color = color
      this.pickcolorstyle = {
        background: `${color}`
      }
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
      console.log(this.allevent)
      if (this.title.length < 1) {
        this.$swal('錯誤', '未輸入活動標題', 'error')
      } else if (this.color.length < 1) {
        this.$swal('錯誤', '未圓點選擇顏色', 'error')
      } else if (this.description.length < 1) {
        this.$swal('錯誤', '無活動描述', 'error')
      } else {
        const fd = new FormData()
        fd.append('title', this.title)
        fd.append('color', this.color)
        fd.append('start', this.range.start)
        fd.append('end', this.range.end)
        fd.append('src', this.src)
        fd.append('description', this.description)
        this.title = ''
        this.color = ''
        this.src = null
        this.description = ''
        this.range = {
          start: new Date(),
          end: new Date()
        }

        this.axios.post('http://localhost:3000/addevent', fd, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(res => {
            this.$swal('完成', '已成功新增活動', 'success')
          }).catch(error => {
            this.$swal('錯誤', `${error.response.data.message}`, 'error')
          })
      }
    }
  },
  mounted: function () {
    this.axios.post('http://localhost:3000/allevent')
      .then(res => {
        this.allevent = res.data.result.map(data => {
          return {
            title: data.title,
            color: data.color,
            range: {
              start: data.start,
              end: data.end
            },
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
.tablecolorstyle{
  width 2rem
  height 2rem
  border-radius 50%
  margin-left 15%
}
.vs-table-text{
  text-align center
  margin auto
}
.pickcolorstyle{
  border-radius 0.5rem
  height 3rem
  transition 1s
  color white
  text-shadow 0rem 0rem 0.3rem black
  font-size 2rem
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
