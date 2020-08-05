<template>
  <div id="member">
    <h1 class="text-center mt-4 mb-4">會員專區</h1>
    <div class="container all" :style="allstyle">
      <form :style="loginstyle" class="login">
        <fieldset class="p-2 fieldset m-2 m-lg-5">
          <legend class="legend">登入</legend>
          <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center">
                <label class="col-12 col-lg-4 text" for="loginaccount">帳號：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="loginaccount"
                  v-model="loginaccount"
                  :state="loginaccountState"
                  placeholder="請輸入至少8個字"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center"
              >
                <label class="col-12 col-lg-4 text" for="loginpassword">密碼：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="logingpassword"
                  v-model="loginpassword"
                  :state="loginpasswordState"
                  type="password"
                  placeholder="請輸入至少8個字"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
            </div>
          </div>
          <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
            <div class="col-lg-2 text-right">
              <button @click="login" class="btn btn-primary">確認</button>
            </div>
            <div class="col-lg-2 text-left">
              <button class="btn btn-danger">重寫</button>
            </div>
          </div>
        </fieldset>
        <button  @click="changetoggle" class="btn btn-light toggle">沒有帳號?</button>
      </form>
      <form :style="registeringstyle" class="registering">
        <fieldset class="p-2 fieldset m-2 m-lg-5">
          <legend class="legend">註冊</legend>
          <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center"
              >
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
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center"
              >
                <label class="col-12 col-lg-4 text" for="account">帳號：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="account"
                  v-model="account"
                  :state="accountState"
                  placeholder="請輸入至少8個字"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
              <div class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center">
                <label class="col-12 col-lg-4 text" for="password">密碼：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="password"
                  v-model="password"
                  :state="passwordState"
                  type="password"
                  placeholder="請輸入至少8個字"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center"
              >
                <label class="col-12 col-lg-4 text" for="repassword">確認：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="repassword"
                  v-model="repassword"
                  :state="repasswordState"
                  type="password"
                  placeholder="請輸入至少8個字"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col d-flex flex-wrap justify-content-center">
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center"
              >
                <label class="col-12 col-lg-4 text" for="phone">電話：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="phone"
                  v-model="phone"
                  :state="phoneState"
                  placeholder="請輸入電話號碼"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
              <div
                class="col-12 col-lg-6 d-flex flex-wrap justify-content-center mt-3 align-items-center">
                <label class="col-12 col-lg-4 text" for="email">信箱：</label>
                <b-form-input
                  class="col-12 col-lg-8 p-lg-2"
                  id="email"
                  v-model="email"
                  :state="emailState"
                  placeholder="請輸入E-mail"
                  trim
                ></b-form-input>
                <b-form-text class="col-6"></b-form-text>
              </div>
            </div>
          </div>
          <div class="row justify-content-center align-items-center mt-5">
            <div class="col-6 text-right">
              <b-button  class="btn-success" v-b-modal.modal-1>會員須知</b-button>
              <b-modal id="modal-1" title="會員須知">
                <ul class="ml-5">
                  <li>每天需繳3000會費</li>
                  <li>要膜拜店長</li>
                  <li>吃飯要付錢</li>
                </ul>
              </b-modal>
            </div>
            <div class="col-6 mt-2 text-left">
              <input v-model="checked" type="checkbox" />我已經詳讀會員須知
            </div>
          </div>
          <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
            <div class="col-lg-2 text-right">
              <button @click="registering" class="btn btn-primary">確認</button>
            </div>
            <div class="col-lg-2 text-left">
              <button class="btn btn-danger">重寫</button>
            </div>
          </div>
        </fieldset>
        <button href="#" @click="changetoggle" class="btn btn-light toggle">已有帳號</button>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      name: '',
      account: '',
      password: '',
      repassword: '',
      phone: '',
      email: '',
      loginaccount: '',
      loginpassword: '',
      checked: false,
      allstyle: {},
      registeringstyle: {},
      loginstyle: {},
      toggle: false
    }
  },
  computed: {
    nameState () {
      if (this.name.length === 0) {
        return null
      } else {
        return this.name.length > 0
      }
    },
    accountState () {
      if (this.account.length === 0) {
        return null
      } else {
        return this.account.length > 7
      }
    },
    passwordState () {
      if (this.password.length === 0) {
        return null
      } else {
        return this.password.length > 7
      }
    },
    repasswordState () {
      if (this.repassword.length === 0) {
        return null
      } else {
        return this.repassword === this.password
      }
    },
    phoneState () {
      if (this.phone.length === 0) {
        return null
      } else {
        return this.phone.length > 6
      }
    },
    emailState () {
      if (this.email.length === 0) {
        return null
      } else {
        return this.email.includes('@')
      }
    },
    loginaccountState () {
      if (this.loginaccount.length === 0) {
        return null
      } else {
        return this.loginaccount.length > 7
      }
    },
    loginpasswordState () {
      if (this.loginpassword.length === 0) {
        return null
      } else {
        return this.loginpassword.length > 7
      }
    }
  },
  methods: {
    registering () {
      if (this.checked) {
        if (this.name.length < 1) {
          this.$swal('錯誤', '未輸入姓名', 'error')
        } else if (this.account.length < 8) {
          this.$swal('錯誤', '帳號格式不符', 'error')
        } else if (this.password.length < 8) {
          this.$swal('錯誤', '密碼格式不符', 'error')
        } else if (this.password !== this.repassword) {
          this.$swal('錯誤', '重複輸入密碼錯誤', 'error')
        } else if (isNaN(this.phone) || this.phone.length < 7) {
          this.$swal('錯誤', '電話格式錯誤', 'error')
        } else if (!this.email.includes('@')) {
          this.$swal('錯誤', '電子郵件格式錯誤', 'error')
        } else {
          const rand = Math.floor(Math.random() * 10)
          const rand2 = Math.floor(Math.random() * 100)
          const ans = (rand + rand2).toString()
          const judge = prompt(`${rand}+${rand2}=?`)
          if (judge === ans) {
            this.axios.post(process.env.VUE_APP_APIURL + '/registering', {
              name: this.name,
              account: this.account,
              password: this.password,
              phone: this.phone,
              email: this.email
            })
              .then(res => {
                if (res.data.success) {
                  this.$swal('成功', '註冊成功', 'success')
                  this.name = ''
                  this.account = ''
                  this.password = ''
                  this.repassword = ''
                  this.phone = ''
                  this.email = ''
                } else {
                  this.$swal('錯誤', `${res.data.message}`, 'error')
                }
              }).catch(error => {
                this.$swal('錯誤', `${error.response.data.message}`, 'error')
              })
          } else {
            this.$swal('錯誤', '數字驗證錯誤', 'error')
          }
        }
      } else {
        this.$swal('未勾選', '請先閱讀會員須知', 'question')
      }
    },
    login () {
      this.axios.post(process.env.VUE_APP_APIURL + '/login', { account: this.loginaccount, password: this.loginpassword })
        .then(res => {
          if (res.data.success) {
            this.$swal('成功', '登入成功', 'success')
            this.$store.commit('login', [res.data.name, res.data.account])
            if (this.loginaccount === 'user1234') {
              this.$router.push('/back')
            } else {
              this.$router.push('/member_login')
            }
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
        this.loginstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
        this.registeringstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
      } else {
        this.allstyle = {
          transform: 'rotateY(0deg)'
        }
        this.loginstyle = {
          pointerEvents: 'auto',
          opacity: '1'
        }
        this.registeringstyle = {
          pointerEvents: 'none',
          opacity: '0'
        }
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
  .fieldset{
    border 1px solid black
    .legend{
      font-size 2rem
      padding-left  1rem
      width 6rem
      margin-left 5%
      margin-bottom 0
    }
  }
  .text{
    font-size 1.3rem
  }
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
    .login{
      position: absolute;
      right 0
      left 0
      top 0
      bottom 0
      margin auto
      transition 0.5s
    }
    .registering{
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
