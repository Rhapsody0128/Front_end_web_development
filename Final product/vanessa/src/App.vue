<template>
  <div id="app">
    <div id="navbar">
      <div v-if="toggle==false">
        <h1 @click="change">asd</h1>
        <router-link to="/">Home</router-link>|
        <router-link to="/navbar">About</router-link>
      </div>
      <div v-else @click="change">
        <div>
          <h1>a</h1>
        </div>
      </div>
    </div>

    <router-view />
  </div>
</template>
<script>
export default {
  data () {
    return {
      toggle: true
    }
  },
  methods: {
    change () {
      console.log(this.toggle)
      this.toggle = !this.toggle
      return this.toggle
    }
  }
}
</script>
