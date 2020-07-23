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
    <div v-if="style===0" class="aa">
          <h1>商業空間設計施工</h1>
          <p>我們打造優質的用餐環境，讓你的客戶來一次，就會來第二次尤其台灣人特別 愛拍美食，拍完無非就是分享，餐廳應該更重視空間的設計</p>
    </div>
    <div v-if="style===1" class="bb">
          <h1>v-if</h1>
          <p>若希望某區塊在特定條件下才出現，可以使用v-if、v-if-else和v-else依照  運算結果決定出現的時機。</p>
    </div>
    <div v-if="style===2" class="cc">
          <h1>工作</h1>
          <p>今年年初（回歸？）到趨勢科技，目前在 DDI。趨勢是個對工程師很好的地 方，工作環境很好、人很優秀、待遇也不錯 😊我認為在工作上除了能做到有趣、  能成長、有成就感的專案之外，找到 夥伴 也是很重要的</p>
    </div>
    <div v-if="style===3" class="dd">
          <h1>商業空間設計施工</h1>
          <p>我們打造優質的用餐環境，讓你的客戶來一次，就會來第二次尤其台灣人特別 愛拍美食，拍完無非就是分享，餐廳應該更重視空間的設計</p>
    </div>
    <div v-if="style===4" class="ee">
          <h1>CSS Media Queries</h1>
          <p>在製作 RWD 響應式網頁時，一定會用到的 CSS 語法就是 media，代表的就 是針對指定的「媒體」設定樣式，這篇將會對 CSS 的 Media Queries 做個詳細 介紹，也幫助自己未來撰寫時，更有個方向與參考。</p>
    </div>
    <div v-if="style===5" class="ff">
          <h1>使用 Google Photo 作為免費圖片空間</h1>
          <p>隨著網路與社群網站的發展，許多「小編」的行銷人員也隨之孕育而生，但對 於部分不懂網頁技術的小編而言，要找個「圖片空間」放行銷圖片，往往是令人 感到困擾的，雖然有 imgur 可以上傳圖片，但又會遇到有些圖片不想公開的情形。</p>
    </div>
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
      background: [
        "url('./images/1472660456_1e1841d24e_o.jpg')no-repeat center/cover",
        "url('./images/36271782954_f7aa950180_o.jpg')no-repeat center/cover",
        "url('./images/36420482760_fe0771f10d_o.jpg')no-repeat center/cover",
        "url('./images/36420486130_f1c3388269_o.jpg')no-repeat center/cover",
        "url('./images/4903092900_ff43be2aff_o.jpg')no-repeat center/cover",
        "url('./images/9677717700_3b10b4f206_o.jpg')no-repeat center/cover"],
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
      h1{
        animation:drive 1s
      }
      p{
        animation:show 2s
      }
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
    background url('/images/box.png') center/cover
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
  @keyframes drive {
    from{
      margin-left :-100%;
    }
    75%{
      margin-left:25%;
    }
    to{
      margin-left:1%
    }
  }
  @keyframes show {
    from{
      opacity 0
    }
    to{
      opacity 1
    }
  }
</style>
