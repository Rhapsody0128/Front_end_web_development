<template>
  <div id="back">
    <h1 class="text-center mt-4 mb-4">後臺管理</h1>
    <div class="container">
      <div class="row justify-content-center">
        <vs-button class="mb-5" @click="active=!active" color="primary" type="filled">管理</vs-button>
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
            src="./images/meal/90170087_2914208675327340_5898319037598793728_o.jpg"/>
          <h4>Vanessa</h4>
        </div>
        <vs-sidebar-item to="/back_menu"  index="1">
          <h4>菜單</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back_news"  index="3">
          <h4>最新消息</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back_market"  index="4">
          <h4>購物廣場</h4>
        </vs-sidebar-item>
        <vs-divider position="left">資料管理</vs-divider>
        <vs-sidebar-item to="/back_order"  index="5">
          <h4>訂位資訊</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back_member"  index="6">
          <h4>會員資料</h4>
        </vs-sidebar-item>
        <vs-sidebar-item to="/back_cart"  index="7">
          <h4>訂單資料</h4>
        </vs-sidebar-item>
      </vs-sidebar>
    </div>
    <hr>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    active: false
  })
}
</script>
