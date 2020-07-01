<template>
<div id="main">
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col col-12 m-auto">
        <img :src="monitor">
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      monitor: 'https://picsum.photos/1024/768/?random=1'
    }
  }
}
</script>
