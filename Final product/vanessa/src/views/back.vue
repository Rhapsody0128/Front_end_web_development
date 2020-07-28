<template>
  <div id="back">
    <h1 class="text-center mt-4 mb-4">後臺管理</h1>
    <div class="container">
      <div class="row justify-content-center">
        <vs-button class="mb-5" @click="active=!active" color="primary" type="filled">編輯</vs-button>
      </div>
      <vs-sidebar
        position-right
        parent="body"
        default-index="1"
        color="primary"
        class="sidebarx"
        spacer
        v-model="active"
      >
        <div class="header-sidebar text-center" slot="header">
          <vs-avatar
            size="100px"
            src="./images/meal/90170087_2914208675327340_5898319037598793728_o.jpg"
          />
          <h4>Vanessa</h4>
        </div>
        <vs-sidebar-item to="/back" @click="status('1')" index="1">
          <h4>菜單</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back" @click="status('2')" index="2">
          <h4>關於我們</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back" @click="status('3')" index="3">
          <h4>最新消息</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back" @click="status('4')" index="4">
          <h4>招募資訊</h4>
        </vs-sidebar-item>
        <vs-divider position="left">資料管理</vs-divider>
        <vs-sidebar-item to="/back" @click="status('訂位資訊')" index="5">
          <h4>訂位資訊</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back" @click="status('6')" index="6">
          <h4>會員資料</h4>
        </vs-sidebar-item>
      </vs-sidebar>
    </div>
    <div class="container">
      <div class="row">
        <div v-if="index=='訂位資訊'" :key="index" class="col">
          <div>
            <vs-table multiple v-model="selected" :data="datas">
              <template slot="header">
                <h3>訂位資訊</h3>
              </template>
              <template slot="thead">
                <vs-th class="title">姓名</vs-th>
                <vs-th class="title">電話</vs-th>
                <vs-th class="title">人數</vs-th>
                <vs-th class="title">日期</vs-th>
                <vs-th class="title">時間</vs-th>
                <vs-th class="title">備註</vs-th>
                <vs-th class="title">刪除</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                  <vs-td :data="data[indextr].name">
                    <span class="text">{{data[indextr].name}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].phone">
                    <span class="text">{{data[indextr].phone}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].peoplecount">
                    <span class="text">{{data[indextr].peoplecount}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].date">
                    <span class="text">{{data[indextr].date}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].time">
                    <span class="text">{{data[indextr].time}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr].remarks">
                    <span class="text">{{data[indextr].remarks}}</span>
                  </vs-td>
                  <vs-td :data="data[indextr]">
                    <vs-button color="danger" type="filled">{{data[indextr].id}}</vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
            <pre>{{ selected }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false,
    index: '',
    datas: [
    ],
    selected: [],
    fields: [
      { key: 'name', label: '姓名', sortable: true },
      { key: 'peoplecount', label: '人數', sortable: true },
      { key: 'phone', label: '電話', sortable: true },
      { key: 'date', label: '日期', sortable: true },
      { key: 'time', label: '時間', sortable: true },
      { key: 'remarks', label: '備註', sortable: true }
    ]
  }),
  methods: {
    status (index) {
      this.index = index
      console.log(this.index)
    }
  },
  mounted: function () {
    this.axios.post('http://localhost:3000/allorder')
      .then(res => {
        this.datas = res.data.result
      })
  }
}
</script>
<style lang="stylus">
.text{
  font-size 1.5rem
}
.title{
  font-size 2rem
}
.vs-icon{
  font-size 0rem !important
}
</style>
