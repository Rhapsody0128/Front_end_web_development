<template>
  <div id="menu">
    <h1 class="text-center mt-4 mb-4">MENU</h1>
    <div id="spcialmeal" class="container-fluid d-flex">
      <div class="row flex-wrap justify-content-center">
        <div class="col-10 col-lg-4">
            <img class="img-fluid img-thumbnail" src="/img/9677717700_3b10b4f206_o.jpg" alt="">
        </div>
        <div class='col-12 col-lg-6'>
          <h1>Spcial Meal</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime ea dignissimos modi corrupti! Voluptatem, sapiente. Veritatis dolorum, vel quaerat ab ut voluptatem nihil, beatae libero eaque atque velit labore animi.</p>
        </div>
      </div>

    <hr>
    <div id="meal" >
      <b-form-group>
        <template v-slot:label>
          <b>Menu</b><br>
          <b-form-checkbox
            v-model="allSelected"
            :indeterminate="indeterminate"
            @change="toggleAll">
            {{ allSelected ? '取消全選' : '全選' }}
          </b-form-checkbox>
        </template>
          <b-form-checkbox-group
            id="flavors"
            v-model="selected"
            :options="flavours"
            name="flavors"
            class="ml-4"
            aria-label="Individual flavours"
            stacked>
          </b-form-checkbox-group>
      </b-form-group>
      <div>
        Selected: <strong>{{ selected }}</strong><br>
        All Selected: <strong>{{ allSelected }}</strong><br>
        Indeterminate: <strong>{{ indeterminate }}</strong>
      </div>
    </div>
    </div>
  </div>

</template>
<script>
export default {
  data () {
    return {
      flavours: ['前菜', '主餐', '湯品', '甜點', '飲料', '披薩'],
      selected: [],
      allSelected: false,
      indeterminate: false
    }
  },
  methods: {
    toggleAll (checked) {
      this.selected = checked ? this.flavours.slice() : []
    }
  },
  watch: {
    selected (newVal, oldVal) {
      // Handle changes in individual flavour checkboxes
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.flavours.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
    }
  }
}
</script>

<style lang="stylus" scoped>

.a{
  width 50px;
}
</style>
