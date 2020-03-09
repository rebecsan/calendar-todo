<template>
  <div>
    <h1>My todo-lists</h1>
    <v-text-field
      class="new-list" 
      @keyup.enter="addList" 
      v-model="listName" 
      dense 
      clearable>
    </v-text-field>
    <v-btn 
      class="add-new-list" 
      @click="addList" 
      outlined 
      color="black">Add new list</v-btn>
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
      lists: [],
      listName: null
    }
  },
  methods: {
    addList() {
      this.lists.push(this.listName);
      this.listName=''
      // app.post('/', (request, response) => {
      //   database.run('INSERT INTO listNames VALUES ($name)', {
      //     $name: request.body.name,
      //   })
      //   .then(() => {
      //     response.send()
      //   })
      // })
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