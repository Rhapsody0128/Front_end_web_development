<template>
<div id="main"
:style="mainstyle"
@mousedown="mousedown"
@mouseup="mouseup"
@touchstart="touchstart"
@touchend="touchend">

  <div :style="boxstyle" id="all" >
    <div class="box a"></div>
    <div class="box b"></div>
    <div class="box c"></div>
    <div class="box d"></div>
    <div class="box e"></div>
    <div class="box f"></div>
  </div>

<button class="explore btn btn-dark text-center" @click="rand">explore</button>
  <div id="text" class='container'>
    <transition name="fade">
    <div v-if="style===0" class="aa">
          <h1 v-text="styledetail[0].title"></h1>
          <p v-text="styledetail[0].description"></p>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="style===1" class="bb">
          <h1 v-text="styledetail[1].title"></h1>
          <p v-text="styledetail[1].description"></p>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="style===2" class="cc">
          <h1 v-text="styledetail[2].title"></h1>
          <p v-text="styledetail[2].description"></p>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="style===3" class="dd">
          <h1 v-text="styledetail[3].title"></h1>
          <p v-text="styledetail[3].description"></p>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="style===4" class="ee">
          <h1 v-text="styledetail[4].title"></h1>
          <p v-text="styledetail[4].description"></p>
    </div>
    </transition>
    <transition name="fade">
    <div v-if="style===5" class="ff">
          <h1 v-text="styledetail[5].title"></h1>
          <p v-text="styledetail[5].description"></p>
    </div>
</transition>
  </div>
</div>
</template>

<script>
export default {

  data () {
    return {
      style: 0,
      boxstyle: {},
      mainstyle: {
        transition: '1s'
      },
      styledetail: [
        {
          title: 'A tavola non s’invecchia',
          description: '「只要待在餐桌旁，年華即不會逝去」',
          background: "url('./images/atmosphere/1446024551-3704374595.jpg')no-repeat center/cover"
        },
        {
          title: '與您相約，戀上幸福好味道',
          description: '選用多種經認證的有機栽種生菜，搭配水果、堅果及清爽的酸甜醬汁',
          background: "url('./images/meal/1446024564-728212007.jpg')no-repeat center/cover"
        },
        {
          title: 'Vanessa-神聖與美好',
          description: '也是本餐廳所追求的意念所在，用最真的一顆心，給予所有客人一如南歐花園的繽紛美好感受',
          background: "url('./images/meal/1446024566-2550922969.jpg')no-repeat center/cover"
        },
        {
          title: '品嘗的不只是氛圍',
          description: '以南歐花園為空間設計的發想，在細節處打造甜蜜浪漫的迷人氛圍',
          background: "url('./images/atmosphere/1446024546-1984352169.jpg')no-repeat center/cover"
        },
        {
          title: '堅持，原味的美味',
          description: '嚴選新鮮頂級的食材，採用自然原味的料理手法，為您呈現一道道兼顧健康美味的歐法風味料理。',
          background: "url('./images/meal/10623342_711455995602630_7133017122918877083_o.jpg')no-repeat center/cover"
        },
        {
          title: '是餐廳，也是家',
          description: '優質的服務團隊，重視每個貴賓用餐的環節，專業之外更在意與客人間的體貼互動',
          background: "url('./images/atmosphere/12010577_909593355788892_5778526372011856134_o.jpg')no-repeat center/cover"
        }
      ],
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

      setTimeout(() => {
        var array = this.boxstyle.transform.split(',')
        // var judge = ''
        // var judge2 = ''
        // var judge3 = ''
        array[3] = Math.abs(parseInt(array[3]))
        const deg = array[3] % 360
        array[0] = array[0].split('(')[1]
        const judge = array[0] % 1.4
        if (judge > 0.2 && judge < 0.5) {
          this.mainstyle.background = this.styledetail[0].background
          this.style = 0
        } else if (judge > 0.5 && judge < 0.8) {
          this.mainstyle.background = this.styledetail[1].background
          this.style = 1
        } else {
          if (deg > 45 && deg < 135) {
            this.mainstyle.background = this.styledetail[2].background
            this.style = 2
          } else if (deg > 135 && deg < 225) {
            this.mainstyle.background = this.styledetail[3].background
            this.style = 3
          } else if (deg > 225 && deg < 315) {
            this.mainstyle.background = this.styledetail[4].background
            this.style = 4
          } else {
            this.mainstyle.background = this.styledetail[5].background
            this.style = 5
          }
        }
      }, 500)
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
      setTimeout(() => {
        var array = this.boxstyle.transform.split(',')
        // var judge = ''
        // var judge2 = ''
        // var judge3 = ''
        array[3] = Math.abs(parseInt(array[3]))
        const deg = array[3] % 360
        array[0] = array[0].split('(')[1]
        const judge = array[0] % 1.4
        if (judge > 0.2 && judge < 0.5) {
          this.mainstyle.background = this.styledetail[0].background
          this.style = 0
        } else if (judge > 0.5 && judge < 0.8) {
          this.mainstyle.background = this.styledetail[1].background
          this.style = 1
        } else {
          if (deg > 45 && deg < 135) {
            this.mainstyle.background = this.styledetail[2].background
            this.style = 2
          } else if (deg > 135 && deg < 225) {
            this.mainstyle.background = this.styledetail[3].background
            this.style = 3
          } else if (deg > 225 && deg < 315) {
            this.mainstyle.background = this.styledetail[4].background
            this.style = 4
          } else {
            this.mainstyle.background = this.styledetail[5].background
            this.style = 5
          }
        }
      }, 500)
    },
    touchstart () {
      this.xs = event.changedTouches[0].clientX
      this.ys = event.changedTouches[0].clientY
    },
    touchend () {
      this.x = event.changedTouches[0].clientX
      this.y = event.changedTouches[0].clientY
      this.xf = (this.x - this.xs) / 300
      this.yf = (this.y - this.ys) / 300
      this.boxstyle = {
        transform: `rotate3d(${Math.abs(this.yf)},${Math.abs(this.xf)},0, ${(this.xf + this.yf) * 150}deg)`
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
        if (judge > 0.2 && judge < 0.5) {
          this.mainstyle.background = this.background[0]
          this.style = 0
        } else if (judge > 0.5 && judge < 0.8) {
          this.mainstyle.background = this.background[1]
          this.style = 1
        } else {
          if (deg > 45 && deg < 135) {
            this.mainstyle.background = this.background[2]
            this.style = 2
          } else if (deg > 135 && deg < 225) {
            this.mainstyle.background = this.background[3]
            this.style = 3
          } else if (deg > 225 && deg < 315) {
            this.mainstyle.background = this.background[4]
            this.style = 4
          } else {
            this.mainstyle.background = this.background[5]
            this.style = 5
          }
        }
      }, 500)
    }
  }
}
</script>
<style lang="stylus" scoped>
  .explore{
    margin-left 50%
    transform translate(-50%,-50%)
    opacity 0.7
  }
  #text{
      font-size:1.2rem
      font-family:'微軟正黑體'
      color:white;
      pointer-events: none;
      transition: 1.5s;
      margin-left:1rem
      margin-right:1rem
      margin-top:2rem;
      text-shadow black 0.3rem 0.3rem 0.3rem
    }
  #all {
      width: 250px;
      height: 250px;
      transform-style:preserve-3d
      transform: rotate3d(0, 0, 0, 0deg);
      margin: auto;
      margin-top: 10rem;
      border-radius: 50%;
      font-family: '微軟正黑體';
      pointer-events: none;
      transition: 1.5s
  }

  .box {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    position: absolute;
    border: 3px solid rgba(255, 255, 255, 0.5);
    box-shadow: 0rem 0rem 2rem rgba(255, 255, 255, 0.5);
    pointer-events: none;
    background url('/images/others/box.png') center/cover
  }
  .a {
    // background: rgba(255, 255, 0, 0.2);
    transform: translateZ(125px);
  }
  .b {
    // background: rgba(0,0, 0, 0.2);
    transform: rotateY(180deg) translateZ(125px);
  }
  .c {
    // background:  rgba(255,0, 0, 0.2)
    transform: rotateY(90deg) translateZ(125px);
  }
  .d {
    // background:  rgba(0,255, 0, 0.2);
    transform: rotateY(-90deg) translateZ(125px);
  }
  .e {
    // background:  rgba(0,0, 255, 0.2)
    transform: rotateX(90deg) translateZ(125px);
  }
  .f {
    // background:  rgba(0,255, 255, 0.2)
    transform: rotateX(-90deg) translateZ(125px);
  }
  @media (min-width : 768px) {
    #all {
    width: 400px;
    height: 400px;
    }
    #text{
      font-size:2rem
      margin-left :10rem
      margin-right :10rem
    }
    .a {
      /* background: transparent; */
      transform: translateZ(200px);
    }
    .b {
      /* background: transparent; */
      transform: rotateY(180deg) translateZ(200px);
    }
    .c {
      /* background: transparent; */
      transform: rotateY(90deg) translateZ(200px);
    }
    .d {
      /* background: transparent; */
      transform: rotateY(-90deg) translateZ(200px);
    }
    .e {
      /* background: transparent; */
      transform: rotateX(90deg) translateZ(200px);
    }
    .f {
      /* background: transparent; */
      transform: rotateX(-90deg) translateZ(200px);
    }
  }
  .fade-enter-active, .fade-leave-active {
      position absolute
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>
