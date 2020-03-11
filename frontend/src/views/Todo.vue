<template>
  <div>
    <h1>My todo-lists</h1>
    <form>
      <v-text-field
        class="new-list" 
        @keydown.enter.prevent="addList" 
        v-model="listName" 
        dense 
        clearable>
      </v-text-field>
      <v-btn 
        class="add-new-list" 
        @click.prevent="addList" 
        outlined 
        color="black">Add new list
      </v-btn>
    </form>
    <ul>
      <li v-for="item in lists" :key="item.id">
        <span >{{ item.name ? item.name :item }}</span>
        <v-btn outlined icon small>+</v-btn>
        <v-btn @click="deleteList(item.id)" outlined icon small>x</v-btn>
        <EditTodo :item="item" ref="edit"/>
      </li>
    </ul>
  </div>
</template>

<script>
import EditTodo from '@/components/EditTodo.vue'

export default {
  name: "Todo",

  components: {
    EditTodo
  },

  created() {
      this.renderLists()
  },

  data() {
    return {
      lists: [],
      listName: null,
      listNames: null
      // newName: null
    }
  },
  methods: {
    addList() { 
      fetch('http://localhost:3000/todo', {
        body: JSON.stringify({name: this.listName}),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
      .then(() => {this.renderLists()});
      this.lists.push(this.listName)

      this.listName=''
    },

    deleteList(id) {
      fetch('http://localhost:3000/todo/' + id, {
        method: 'DELETE'
      }).then(response => {
        this.renderLists()
      })
    },
    
    renderLists() {
      fetch('http://localhost:3000/todo')
        .then(response => response.json())
        .then(result => {
          this.lists = result
        })
    }
  },
  
  provide() {
    return {
      renderLists: this.renderLists
    }
  }
};
</script>

<style scoped>
  .new-list {
    width: 20vw;
    display: inline-block;
  }
  v-btn {
    display: inline;
  }
</style>