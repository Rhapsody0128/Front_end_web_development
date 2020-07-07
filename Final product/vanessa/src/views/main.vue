<template>
<div id="main"
:style="mainstyle" @mousedown="mousedown"
@mouseup="mouseup"
@touchstart="touchstart"
@touchmove="touchmove"
@click="rand"
>
  <div :style="boxstyle" id="all" >
    <div class="box a">紅</div>
    <div class="box b">橙</div>
    <div class="box c">黃</div>
    <div class="box d">綠</div>
    <div class="box e">藍</div>
    <div class="box f">紫</div>
  </div>
  <div class="container-fluid">
    <div class="row w-100">
      <div class="col col-12 m-auto">

      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {

  data () {
    return {
      boxstyle: {},
      mainstyle: {
        transition: '1s'
      },
      background: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'],
      boxmove: {
        xs: 0,
        ys: 0,
        x: 0,
        y: 0,
        xf: 0,
        yf: 0
      }
    }
  },
  methods: {
    rand () {
      const random = () => { return Math.random() * 3 - 1 }
      const random2 = Math.random() * 360
      this.boxstyle = {
        transform: `rotate3d(${random()},${random()},${random()}, ${random2}deg)`
      }
    },
    mousedown (event) {
      this.xs = event.clientX
      this.ys = event.clientY
    },
    mouseup (event) {
      this.x = event.clientX
      this.y = event.clientY
      this.xf = (this.x - this.xs) / 300
      this.yf = (this.y - this.ys) / 300
      this.boxstyle = {
        transform: `rotate3d(${Math.abs(this.yf)},${Math.abs(this.xf)},0, ${(this.xf + this.yf) * 200}deg)`
      }
    },
    touchstart () {
      this.xs = event.changedTouches[0].clientX
      this.ys = event.changedTouches[0].clientY
    },
    touchmove () {
      this.x = event.changedTouches[0].clientX
      this.y = event.changedTouches[0].clientY
      this.xf = (this.x - this.xs) / 300
      this.yf = (this.y - this.ys) / 300
      this.boxstyle = {
        transform: `rotate3d(${Math.abs(this.yf)},0,0, ${(this.xf + this.yf) * 200}deg)`
      }
      setTimeout(() => {
        var array = this.boxstyle.transform.split(',')
        // var judge = ''
        // var judge2 = ''
        // var judge3 = ''
        array[3] = Math.abs(parseInt(array[3]))
        const deg = array[3] % 360
        array[0] = array[0].split('(')[1]
        const judge = array[0] % 1.4
        console.log(judge)
        if (judge > 0.2 && judge < 0.5) {
          this.mainstyle.background = 'blue'
        } else if (judge > 0.3 && judge < 0.8) {
          this.mainstyle.background = 'purple'
        } else {
          if (deg > 45 && deg < 135) {
            this.mainstyle.background = 'yellow'
          } else if (deg > 135 && deg < 225) {
            this.mainstyle.background = 'red'
          } else if (deg > 225 && deg < 315) {
            this.mainstyle.background = 'green'
          } else {
            this.mainstyle.background = 'orange'
          }
        }
      }, 500)
    }
  },
  watch: {
    mainstyle: function (value) {
      console.log('object')
    }
  }
}
</script>
<style lang="stylus" scoped>

  #all {
      width: 250px;
      height: 250px;
      transform-style:preserve-3d
      transform: rotate3d(0, 0, 0, 0deg);
      margin: auto;
      margin-top: 10rem;
      border-radius: 50%;
      font-family: '微軟正黑體';
      pointer-events: none
      // transition 1s
    }

    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      position: absolute;
      font-size: 60px;
      color: black;
      border: 1px solid black;
      box-shadow: 0rem 0rem 1rem rgba(255, 255, 255, 0.1);

    }

    .a {
      /* background: transparent; */
      transform: translateZ(125px);
    }

    .b {
      /* background: transparent; */
      transform: rotateY(180deg) translateZ(125px);
    }

    .c {
      /* background: transparent; */
      transform: rotateY(90deg) translateZ(125px);
    }

    .d {
      /* background: transparent; */
      transform: rotateY(-90deg) translateZ(125px);
    }

    .e {
      /* background: transparent; */
      transform: rotateX(90deg) translateZ(125px);
    }

    .f {
      /* background: transparent; */
      transform: rotateX(-90deg) translateZ(125px);
    }
</style>
