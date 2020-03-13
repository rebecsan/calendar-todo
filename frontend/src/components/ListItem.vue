<template>
  <div class="list-item">
    <h3 @click="showEdit">{{ item.name ? item.name :item }}</h3>
    <EditTodo :item="item" v-if="edit"/>
    <!-- <v-btn class="icons" outlined icon small>+</v-btn> -->
    <v-btn class="icons" @click="deleteList(item.id)" outlined icon small>X</v-btn>
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
    provide() {
      return {
        showEdit: this.showEdit
      }
    }
  }
</script>

<style scoped>
  .icons {
    margin: 3rem 0.5rem 1rem 0;
    position: relative;
    left: 80%;
  }
  .list-item {
    padding: 0 2rem 0.5rem 0;
    border-right: 2px solid #e4b445;
  }
</style>