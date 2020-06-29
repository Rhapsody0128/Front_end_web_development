<template lang="pug">
  #login
    b-row
      b-col(cols="12")
        h1.text-center 登入
        b-form(@submit="submit")
          b-form-group(
            label="帳號"
            label-for="input-account"
            description="帳號需4 - 20個字"
            invalid-feedback="帳號格式不符"
            :state="state('account')"
            )
            b-form-input#input-account(type="text" v-model="account" :state="state('account')")
          b-form-group(
            label="密碼"
            label-for="input-password"
            description="密碼需4 - 20個字"
            invalid-feedback="密碼格式不符"
            :state="state('password')"
            )
            b-form-input#input-password(type="text" v-model="password" :state="state('password')")
          b-button(type="submit" variant="primary") 登入
</template>
<script>

export default {
  name: 'login',
  data () {
    return {
      account: '',
      password: ''
    }
  },
  methods: {
    state (type) {
      if (type === 'account') {
        if (this.account.length < 4 || this.account.length > 20) {
          return false
        } else {
          return true
        }
      } else if (type === 'password') {
        if (this.password.length < 4 || this.password.length > 20) {
          return false
        } else {
          return true
        }
      }
    },
    submit (event) {
      event.preventDefault()
      if (this.account.length < 4 || this.account.length > 20) {
        alert('帳號格式不符')
        return
      } else if (this.password.length < 4 || this.password.length > 20) {
        alert('密碼格式不符')
        return
      }
      this.axios.post(process.env.VUE_APP_APIURL + '/login', { account: this.account, password: this.password })
        .then(response => {
          const data = response.data
          if (data.success) {
          // 如果回來的資料 success是true
            alert('登入成功')
            this.$store.commit('login', this.account)
            this.$router.push('/album')
          } else {
            // 不是就顯示回來的message
            alert(data.message)
            alert('登入失敗')
          }
        })
        .catch(error => {
          // 如果回來的狀態不是200，顯示回來的message
          alert(error.response.data.message)
        })
    }
  }
}
</script>
