<template>
  <div>
    <v-text-field
      class="new-list" 
      @keydown.enter.prevent="editTodo(item.id)" 
      v-model="newName" 
      dense 
      clearable>
    </v-text-field>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        newName: null
      }
    },

    methods: {
      editTodo(id) { 
        fetch('http://localhost:3000/todo/' + id, {
          body: JSON.stringify({name: this.newName}),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'PUT'
        })
        .then(response => response.json())
        .then(result => {
          console.log(name)
        })
        .then(() => {this.renderLists()
        })
        this.newName=''
      }
    },

    props: {
      item: Object 
    }
  }
</script>

<style scoped>

</style>