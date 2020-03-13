<template>
  <div>
    <h3 @click="showEdit()">{{ item.name ? item.name :item }}</h3>
    <v-btn outlined icon small>+</v-btn>
    <v-btn @click="deleteList(item.id)" outlined icon small>X</v-btn>
    <EditTodo :item="item" v-if="edit"/>
  </div>
</template>

<script>
import EditTodo from '@/components/EditTodo.vue'
  export default {
    name: 'ListItem',
    components: {
      EditTodo,
    },
    data() {
      return {
        edit: false
      }
    },
    inject: [
      'deleteList'
    ],
    methods: {
      showEdit() {
        this.edit = !this.edit
      }
    },
    props: {
      item: Object 
    },
  }
</script>
