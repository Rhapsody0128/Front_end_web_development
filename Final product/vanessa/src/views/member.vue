<template>
  <div id="member">
    <h1 class="text-center mt-4 mb-4">會員專區</h1>
    <div class="row">
      <div class="col">
        <form>
          <fieldset class="p-2 fieldset m-2 m-lg-5">
            <legend class="legend">註冊</legend>
            <div class="d-flex flex-wrap justify-content-center mt-3">
              <label class="col-4 col-lg-1 text" for="name">姓名：</label>
              <b-form-input
                class="col-8 col-lg-11"
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
            <div class="d-flex flex-wrap justify-content-center mt-3">
              <label class="col-4 col-lg-1 text" for="account">帳號：</label>
              <b-form-input
                class="col-8 col-lg-11"
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
            <div class="d-flex flex-wrap justify-content-center mt-3">
              <label class="col-4 col-lg-1 text" for="password">密碼：</label>
              <b-form-input
                class="col-8 col-lg-11"
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
            <div class="d-flex flex-wrap justify-content-center mt-3">
              <label class="col-4 col-lg-1 text" for="repassword">確認密碼：</label>
              <b-form-input
                class="col-8 col-lg-11"
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
      repassword: ''
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
