<template>
  <div id="list">
    <b-form-input v-model="newtodo"></b-form-input>
    <b-btn variant="success" @click='addtodo'>新增</b-btn>
    <b-table-simple>
      <draggable v-model="todos" tag="tbody">
        <b-tr v-for="(todo,index) in todos" :key='index'>
          <b-td>{{todo.name}}</b-td>
          <b-td></b-td>
        </b-tr>
      </draggable>
    </b-table-simple>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newtodo: ''
    }
  },
  methods: {
    addtodo () {
      this.$store.commit('addtodo', this.newtodo)
      this.newtodo = ''
    }
  },
  computed: {
    todos: {
      get () {
        return this.$store.getters.todos
      },
      set (value) {
        this.$store.commit('dragTodo', value)
      }
    }
  }
}
</script>
