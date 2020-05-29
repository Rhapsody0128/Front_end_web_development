<template lang="pug">
#home
  h1 Home
  b-form-input(v-model="textInput")

</template>

<script>

export default {
  data () {
    return {
      textInput: ''
    }
  },
  mounted () {

  }
}
</script>
