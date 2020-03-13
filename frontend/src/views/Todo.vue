<template>
  <main>
    <img src="@/assets/pussel6.svg"/>
    <h1>Att-göra listor</h1>
    <form>
      <label for="new-list">Ny lista</label>
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
        color="black">Lägg till lista
      </v-btn>
    </form>
    <section id="lists">
      <div v-for="item in lists" :key="item.id">
        <ListItem :item="item"/>
      </div>
    </section>
  </main>
</template>

<script>
import ListItem from '@/components/ListItem.vue'

export default {
  name: "Todo",

  components: {
    ListItem
  },

  created() {
      this.renderLists()
  },

  data() {
    return {
      lists: [],
      listName: null
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
      renderLists: this.renderLists,
      deleteList: this.deleteList
    }
  }
};
</script>

<style scoped>
  h1 {
    font-family: "Bebas Neue";
    margin-top: 4rem;
  }
  h3 {
    font-family: "Bebas Neue";
    font-size: 1.4rem;
    margin-top: 4rem;
  } 
  main {
    width: 87%;
    margin: auto;
    padding-bottom: 4rem;
  }
  #lists {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }
  img {
    position: absolute;
    max-height: 950px;
    opacity: 0.5;
    margin-left: 63rem;
    margin-top: 0;
  }
  form {
    margin-top: 5rem;
    position: relative;
    width: 30%;
  }
  label {
    font-family: "Bebas Neue";
    font-size: 1.2em;
  }
  v-btn {
    display: inline;
  }
  .add-new-list{
    font-family: "Bebas Neue";
    font-size: 1em;
    margin-bottom:3em;
  }

</style>
