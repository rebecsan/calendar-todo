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
      <li v-for="list in lists" :key="list.id">
        {{ list }}
        <v-btn outlined icon small>+</v-btn>
        <v-btn outlined icon small>x</v-btn>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Todo",
  data() {
    return {
      // inputs: [],
      lists: [],
      listName: null
    }
  },
  methods: {
    addList() {
      this.lists.push(this.listName);
      // this.listName=''
      console.log(this.listName)
      fetch('http://localhost:3000/todo', {
        // body: '{"name": "Baka"}',
        body: '{"name": "' + this.listName + '"}',
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      })
        .then(response => response.json())
        .then(result => {
          console.log(this.listName)
          console.log(result)
          // this.inputs = result;
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