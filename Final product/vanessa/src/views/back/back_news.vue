<template>
  <div id="back_news">
    <h1 class="text-center mt-4 mb-4 title-lg">活動新增</h1>
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
          <b-form-file class="b-form-file" v-model="src" :state="state" @input="validateFile" placeholder="選擇檔案或拖曳至此" drop-placeholder="將檔案拖曳至此" requiredbrowse-text="瀏覽" accept="image/*"></b-form-file>
          <p>圖片請在1MB以下</p>
        </div>
        <div class="col-lg-6 col-12 mt-5 d-flex justify-content-center flex-wrap">
          <h3 class="title mb-4 col-12">活動內容</h3>
          <vs-textarea class="col-12" label="活動內容" v-model="description"></vs-textarea>
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
      <h1 class="text-center mt-4 mb-4 title-lg">活動管理</h1>
    <div class="container">
      <vs-table :data="allevent">
        <template slot="thead">
          <vs-th sort-key="title"><span class="item">活動</span></vs-th>
          <vs-th sort-key="range"><span class="item text-center">月曆呈現</span></vs-th>
          <vs-th ><span class="item">圖片</span></vs-th>
          <vs-th ><span class="item">內容</span></vs-th>
          <vs-th ><span class="item">動作</span></vs-th>
        </template>
        <template slot-scope="{data}">
          <vs-tr :key="indextr" v-for="(tr, indextr) in data" >
            <vs-td :data="tr.title">
              <span class='text'>{{tr.title}}</span>
              <template slot="edit">
                <vs-input class="inputx col-12" label-placeholder="活動標題" v-model="tr.title"/>
              </template>
            </vs-td>
            <vs-td :data="tr">
              <v-calendar
              :attributes=[tr]
            ></v-calendar>
            <template slot="edit">
              <v-date-picker class="w-100 col-12" mode='range' v-model='tr.dates'/>
            </template>
            </vs-td>
            <vs-td :data="tr.src">
              <div>
                <div class="image">
                  <img :src="tr.src">
                </div>
              </div>
            </vs-td>
            <vs-td class="w-25" :data="tr.description">
              <div class="overflow-hidden">
                <span class='text'>{{tr.description}}</span>
              </div>
              <template slot="edit">
                <vs-textarea class="col-12" label="活動內容" v-model="tr.description"></vs-textarea>
              </template>
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
var changedatesformat = (datastart, dataend) => {
  const start = datastart.toString().substr(4, 11).split(' ')
  const end = dataend.toString().substr(4, 11).split(' ')
  switch (start[0]) {
    case 'Jan':
      start[0] = 1
      break
    case 'Feb':
      start[0] = 2
      break
    case 'Mar':
      start[0] = 3
      break
    case 'Apr':
      start[0] = 4
      break
    case 'May':
      start[0] = 5
      break
    case 'Jun':
      start[0] = 6
      break
    case 'Jul':
      start[0] = 7
      break
    case 'Aug':
      start[0] = 8
      break
    case 'Sep':
      start[0] = 9
      break
    case 'Oct':
      start[0] = 10
      break
    case 'Nov':
      start[0] = 11
      break
    case 'Dec':
      start[0] = 12
      break
  }
  switch (end[0]) {
    case 'Jan':
      end[0] = 1
      break
    case 'Feb':
      end[0] = 2
      break
    case 'Mar':
      end[0] = 3
      break
    case 'Apr':
      end[0] = 4
      break
    case 'May':
      end[0] = 5
      break
    case 'Jun':
      end[0] = 6
      break
    case 'Jul':
      end[0] = 7
      break
    case 'Aug':
      end[0] = 8
      break
    case 'Sep':
      end[0] = 9
      break
    case 'Oct':
      end[0] = 10
      break
    case 'Nov':
      end[0] = 11
      break
    case 'Dec':
      end[0] = 12
      break
  }
  start[1] = parseInt(start[1])
  start[2] = parseInt(start[2])
  end[1] = parseInt(end[1])
  end[2] = parseInt(end[2])
  return [start, end]
}
export default {
  data () {
    return {
      color: '',
      pickcolorstyle: {},
      state: null,
      title: '',
      src: null,
      description: '',
      range: {
        start: new Date(),
        end: new Date()
      },
      allevent: '',
      changeevent: ''
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
      if (this.title.length < 1) {
        this.$swal('錯誤', '未輸入活動標題', 'error')
      } else if (this.color.length < 1) {
        this.$swal('錯誤', '未圓點選擇顏色', 'error')
      } else if (this.description.length < 1) {
        this.$swal('錯誤', '無活動內容', 'error')
      } else {
        const fd = new FormData()
        fd.append('title', this.title)
        fd.append('color', this.color)
        fd.append('startyear', changedatesformat(this.range.start, this.range.end)[0][2])
        fd.append('startmonth', changedatesformat(this.range.start, this.range.end)[0][0])
        fd.append('startday', changedatesformat(this.range.start, this.range.end)[0][1])
        fd.append('endyear', changedatesformat(this.range.start, this.range.end)[1][2])
        fd.append('endmonth', changedatesformat(this.range.start, this.range.end)[1][0])
        fd.append('endday', changedatesformat(this.range.start, this.range.end)[1][1])
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

        this.axios.post(process.env.VUE_APP_APIURL + '/addevent', fd, {
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
    },
    openConfirm (data) {
      this.changeevent = data
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
      this.axios.post(process.env.VUE_APP_APIURL + '/changeevent', {
        title: this.changeevent.title,
        startyear: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[0][2],
        startmonth: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[0][0],
        startday: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[0][1],
        endyear: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[1][2],
        endmonth: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[1][0],
        endday: changedatesformat(this.changeevent.dates.start, this.changeevent.dates.end)[1][1],
        id: this.changeevent.id,
        description: this.changeevent.description
      })
        .then(res => {
          this.$swal('完成', '已成功更變菜單', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    },
    openDeleteConfirm (data) {
      this.changeevent = data
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
      this.axios.post(process.env.VUE_APP_APIURL + '/deleteevent', {
        id: this.changeevent.id
      })
        .then(res => {
          this.$swal('完成', '已成功刪除活動', 'success')
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    }
  },

  mounted: function () {
    this.axios.post(process.env.VUE_APP_APIURL + '/allevent')
      .then(res => {
        this.allevent = res.data.result.map(data => {
          return {
            highlight: data.color,
            dates: {
              start: new Date(data.startyear, data.startmonth - 1, data.startday),
              end: new Date(data.endyear, data.endmonth - 1, data.endday)
            },
            popover: {
              label: data.title
            },
            title: data.title,
            description: data.description,
            src: process.env.VUE_APP_APIURL + '/images/' + data.src,
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
.pickcolorstyle{
  border-radius 0.5rem
  height 3rem
  transition 1s
  color white
  text-shadow 0rem 0rem 0.3rem black
  font-size 2rem
}
</style>
