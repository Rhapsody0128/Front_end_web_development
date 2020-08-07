<template>
  <div id="member_login">
    <h1 class="text-center mt-4 mb-4 bigtitle">會員專區</h1>
    <div :style="allstyle" class="container all">
      <form :style="orderstyle" class="order">
        <fieldset class="p-2 fieldset m-2 m-lg-5">
          <legend class="legend">訂位</legend>
          <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
              <div class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center">
                <label class="col-12 col-lg-4 text" for="name">姓名：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="name"
                  v-model="name"
                  :state="nameState"
                  placeholder="請輸入姓名"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
              <div class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center">
                <label class="col-12 col-lg-4 text" for="phone">電話：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="phone"
                  v-model="phone"
                  :state="phoneState"
                  placeholder="請輸入電話"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-12 col-lg-6 d-flex align-items-center flex-wrap">
              <div class="col-12 col-lg-4 mt-2">
                <p class="text col">日期：</p>
              </div>
              <div class="col-12 col-lg-8 text mt-3">
                <v-date-picker  v-model="date" />
              </div>
            </div>
            <div class="col-12 col-lg-6 d-flex align-items-center flex-wrap">
              <div class="col-12 col-lg-4 mt-3 p-lg-0">
                <p class="text col">人數：</p>
              </div>
              <div class="col-12 col-lg-8 pl-4 mt-3">
                <b-dropdown id="dropdown-1" :text="peoplecount" class="m-md-2">
                  <b-dropdown-item @click="changepeoplecount('1')">1人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('2')">2人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('3')">3人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('4')">4人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('5')">5人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('6')">6人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('7')">7人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('8')">8人</b-dropdown-item>
                  <b-dropdown-item @click="changepeoplecount('9')">8人以上</b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-lg-6 d-flex align-items-center flex-wrap">
              <div class="col-12 col-lg-4">
                <p class="text col">時間：</p>
              </div>
              <div class="col-12 col-lg-8 text mt-2">
                <div class="mt-4">
                  <b-form-timepicker b-form-timepicker v-model="time" locale="tw"></b-form-timepicker>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 d-flex align-items-center flex-wrap">
              <div class="col-12 col-lg-4 mt-2">
                <p class="text">備註：</p>
              </div>
              <div class="col-12 col-lg-8 text mt-2">
                <b-form-textarea
                id="textarea"
                v-model="remarks"
                placeholder="請輸入備註..."
                rows="3"
                max-rows="6"
                ></b-form-textarea>
              </div>
            </div>
          </div>
          <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
            <div class="col-lg-2 text-right">
              <button @click="order" class="btn btn-primary">確認</button>
            </div>
            <div class="col-lg-2 text-left">
              <button class="btn btn-danger">重寫</button>
            </div>
          </div>
        </fieldset>
        <button @click="changetoggle" class="btn btn-light toggle">查看訂位</button>
      </form>
      <form :style="checkstyle" class="check">
        <fieldset class="p-2 fieldset m-2 m-lg-5">
          <legend class="legend">查詢</legend>
            <div class="row">
              <div class="col-12 pl-5 pt-4 ">
                <p class="text">姓名：{{orderedname}}</p>
                <p class="text">電話：{{orderedphone}}</p>
                <p class="text">人數：{{orderedpeoplecount}}</p>
                <p class="text">日期：{{ordereddate}}</p>
                <p class="text">時間：{{orderedtime}}</p>
                <p class="text">備註：{{orderedremarks}}</p>
              </div>
            </div>
            <div class="row mt-3 justify-content-center align-items-center flex-nowrap">
            <div class="col-lg-2 text-center">
                <b-button class="btn btn-danger" v-b-modal.modal-1>取消訂位</b-button>
                <b-modal @ok='cancelorder' id="modal-1" title="取消訂位">
                  <p class="my-4">確定要取消訂位?</p>
                </b-modal>
            </div>
          </div>
        </fieldset>
        <button @click="changetoggle" class="btn btn-light toggle">前往訂位</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      date: new Date(),
      name: '',
      phone: '',
      peoplecount: '',
      time: '',
      remarks: '',
      orderedname: '',
      ordereddate: '',
      orderedphone: '',
      orderedpeoplecount: '',
      orderedtime: '',
      orderedremarks: '',
      orderstyle: {},
      checkstyle: {},
      allstyle: {},
      toggle: false
    }
  },
  methods: {
    changepeoplecount (peoplecount) {
      this.peoplecount = peoplecount
      if (peoplecount === '9') {
        this.peoplecount = '8人以上'
      }
    },
    order () {
      this.axios.post(process.env.VUE_APP_APIURL + '/order', {
        account: this.account,
        name: this.name,
        phone: this.phone,
        peoplecount: this.peoplecount,
        time: this.time,
        remarks: this.remarks,
        date: this.date
      })
        .then(res => {
          if (res.data.success) {
            this.$swal('成功', '訂位成功', 'success')
            this.orderedname = res.data.result.name
            this.orderedphone = res.data.result.phone
            this.orderedpeoplecount = res.data.result.peoplecount
            this.ordereddate = res.data.result.date.substr(0, 10)
            this.orderedtime = res.data.result.time
            this.orderedremarks = res.data.result.remarks
          } else {
            this.$swal('錯誤', `${res.data.message}`, 'error')
          }
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    },
    cancelorder () {
      this.axios.post(process.env.VUE_APP_APIURL + '/cancelorder', {
        account: this.account
      })
        .then(res => {
          if (res.data.success) {
            this.$swal('成功', '取消成功', 'success')
            this.orderedname = ''
            this.orderedphone = ''
            this.orderedpeoplecount = ''
            this.ordereddate = ''
            this.orderedtime = ''
            this.orderedremarks = ''
          } else {
            this.$swal('錯誤', `${res.data.message}`, 'error')
          }
        }).catch(error => {
          this.$swal('錯誤', `${error.response.data.message}`, 'error')
        })
    },
    changetoggle () {
      this.toggle = !this.toggle
      if (this.toggle) {
        this.allstyle = {
          transform: 'rotateY(180deg)'
        }
        this.orderstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.checkstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
      } else {
        this.allstyle = {
          transform: 'rotateY(0deg)'
        }
        this.orderstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
        this.checkstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
      }
    }
  },
  computed: {
    nameState () {
      return this.name.length > 0
    },
    phoneState () {
      return this.phone.length > 6
    },
    account () {
      return this.$store.getters.account
    }
  },
  mounted: function () {
    this.$store.commit('boxshow')
    this.axios.post(process.env.VUE_APP_APIURL + '/checkorder', {
      account: this.account
    })
      .then(res => {
        if (res.data.result.length > 0) {
          this.orderedname = res.data.result[0].name
          this.orderedphone = res.data.result[0].phone
          this.orderedpeoplecount = res.data.result[0].peoplecount
          this.ordereddate = res.data.result[0].date.substr(0, 10)
          this.orderedtime = res.data.result[0].time
          this.orderedremarks = res.data.result[0].remarks
        }
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
    this.axios.post(process.env.VUE_APP_APIURL + '/getuserinfo', {
      account: this.account
    })
      .then(res => {
        if (res.data.success) {
          this.name = res.data.result[0].name
          this.phone = res.data.result[0].phone
        }
      }).catch(error => {
        this.$swal('錯誤', `${error.response.data.message}`, 'error')
      })
  }
}

</script>
<style lang="stylus" scoped>
.fieldset {
  border: 1px solid black;

  .legend {
    font-size: 2rem;
    padding-left: 1rem;
    width: 6rem;
    margin-left: 5%;
    margin-bottom: 0;
  }
}
.text {
  font-size: 1.3rem;
}

.all{
  transform-style: preserve-3d
  position relative
  top 0
  right 0
  left 0
  bottom 0
  margin auto
  transform: rotateY(0deg);
  transition 1s
  .order{
    position: absolute;
    right 0
    left 0
    top 0
    bottom 0
    margin auto
    transition 0.5s
    transform: rotateY(0deg) translateZ(400px);
  }
  .check{
    position: absolute;
    right 0
    left 0
    top 0
    bottom 0
    margin auto
    transform: rotateY(180deg) translateZ(400px);
    pointer-events: none
    transition 0.5s
    opacity 0
  }
}
.toggle{
  position absolute
  right 0
  left 0
  margin auto
}
</style>
