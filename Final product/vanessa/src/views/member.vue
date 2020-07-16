<template>
  <div id="member">
    <h1 class="text-center mt-4 mb-4">會員專區</h1>
    <div class="row">
      <div class="col">
        <form>
          <fieldset class="p-2 fieldset m-2 m-lg-5">
            <legend class="legend">註冊</legend>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="name">姓名：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="name"
                v-model="name"
                :state="nameState"
                placeholder="請輸入姓名"
                trim>
              </b-form-input>
              <b-form-text class="col-6"></b-form-text>
              <b-form-invalid-feedback class="col-6">
                未輸入姓名
              </b-form-invalid-feedback>
            </div>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="account">帳號：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="account"
                v-model="account"
                :state="accountState"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6"></b-form-text>
              <b-form-invalid-feedback class="col-6">
                帳號格式不符
              </b-form-invalid-feedback>
            </div>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="password">密碼：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="password"
                v-model="password"
                :state="passwordState"
                type="password"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6" ></b-form-text>
              <b-form-invalid-feedback class="col-6">
                密碼格式不符
              </b-form-invalid-feedback>
            </div>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="repassword">確認：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="repassword"
                v-model="repassword"
                :state="repasswordState"
                type="password"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6" ></b-form-text>
              <b-form-invalid-feedback class="col-6">
                確認密碼不符
              </b-form-invalid-feedback>
            </div>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="phone">電話：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="phone"
                v-model="phone"
                :state="phoneState"
                type="number"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6" ></b-form-text>
              <b-form-invalid-feedback class="col-6">
                電話格式不符
              </b-form-invalid-feedback>
            </div>
            <div class="row justify-content-center align-items-center mt-5">
              <div class="col-6 col-lg-2 text-right ">
                <b-button class="btn-success" v-b-modal.modal-1>會員須知</b-button>
                <b-modal id="modal-1" title="會員須知">
                  <ul class="ml-5">
                    <li>每天需繳3000會費</li>
                    <li>要膜拜店長</li>
                    <li>吃飯要付錢</li>
                  </ul>
                </b-modal>
              </div>
              <div class="col-6 col-lg-2 mt-2 text-left">
                <input  type="checkbox">我已經詳讀會員須知
              </div>
            </div>
            <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
              <div class="col-lg-2 text-right">
                <button class="btn btn-primary">確認</button>
              </div>
              <div class="col-lg-2 text-left">
                <button class="btn btn-danger">重寫</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form>
          <fieldset class="p-2 fieldset m-2 m-lg-5">
            <legend class="legend">登入</legend>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="loginaccount">帳號：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="loginaccount"
                v-model="loginaccount"
                :state="loginaccountState"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6"></b-form-text>
              <b-form-invalid-feedback class="col-6">
                帳號格式不符
              </b-form-invalid-feedback>
            </div>
            <div class="d-flex flex-wrap justify-content-center align-items-center mt-3">
              <label class="col-4 col-lg-1 text" for="loginpassword">密碼：</label>
              <b-form-input
                class="col-8 col-lg-10 p-lg-2"
                id="logingpassword"
                v-model="loginpassword"
                :state="loginpasswordState"
                type="password"
                placeholder="請輸入至少8個字"
                trim>
              </b-form-input>
              <b-form-text class="col-6" ></b-form-text>
              <b-form-invalid-feedback class="col-6">
                密碼格式不符
              </b-form-invalid-feedback>
            </div>
            <div class="row mt-5 justify-content-center align-items-center flex-nowrap">
              <div class="col-lg-2 text-right">
                <button class="btn btn-primary">確認</button>
              </div>
              <div class="col-lg-2 text-left">
                <button class="btn btn-danger">重寫</button>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
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
      loginaccount: '',
      loginpassword: ''
    }
  },
  computed: {
    nameState () {
      return this.name.length > 0
    },
    accountState () {
      return this.account.length > 7
    },
    passwordState () {
      return this.password.length > 7
    },
    repasswordState () {
      return this.repassword === this.password
    },
    phoneState () {
      return this.phone.length > 0
    },
    loginaccountState () {
      return this.loginaccount.length > 7
    },
    loginpasswordState () {
      return this.loginpassword.length > 7
    }
  }
}
</script>
<style lang="stylus">
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
</style>
