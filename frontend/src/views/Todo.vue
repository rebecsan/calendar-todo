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
        {{ item.name ? item.name :item }}
        <v-btn outlined icon small>+</v-btn>
        <v-btn @click="deleteList(item.id)" outlined icon small>x</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todo",
  created() {
    this.renderLists()
  },
  data() {
    return {
      // inputs: [],
      lists: [],
      listName: null,
      listNames: null
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
      fetch('http://localhost:3000/todo/' +id, {
        method: 'DELETE'
      }).then(response => {
        console.log(Request)
        console.log(response + 'Hej')
        this.renderLists()
      })
    },
    
    renderLists() {
      fetch('http://localhost:3000/todo')
        .then(response => response.json())
        .then(result => {
          this.lists = result
        //  for(let i = 0; i < result.length; i++) {
        //    this.lists.push(result[i].name)
        //  }
        })
    }
  }
};
</script>

<style lang="scss" scoped>
  .new-list {
    width: 20vw;
    display: inline-block;
  }
  v-btn {
    display: inline;
  }
</style>