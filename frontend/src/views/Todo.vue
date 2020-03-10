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
        {{ item }}
        <v-btn outlined icon small>+</v-btn>
        <v-btn outlined icon small>x</v-btn>
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
        body: '{"name": "' + this.listName + '"}',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })

      this.lists.push(this.listName);
      this.listName=''
    },
    
    renderLists() {
      fetch('http://localhost:3000/todo')
        .then(response => response.json())
        .then(result => {
         for(let i = 0; i < result.length; i++) {
           this.lists.push(result[i].name)
         }
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