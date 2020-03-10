<template>
  <div id="budget">
    <form class="test-form">
      <input type="text" v-model="addedActivity" />
      <input type="text" v-model="addedAmount" />
      <input type="submit" @click.prevent="onClick" />
    </form>
    <ul>
      <li
        @click.prevent="deleteItem"
        v-for="budgetItem in budget"
        :key="budgetItem.id"
      >{{budgetItem.activity}}: {{budgetItem.amount}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Budget",
  created() {
    this.renderBudgetList();
  },
  data() {
    return {
      addedActivity: null,
      addedAmount: null,
      budget: null
    };
  },
  methods: {
    deleteItem() {
      fetch("http://localhost:3000/budget", {
        body:
          '{"activity": "' +
          this.addedActivity +
          '"' +
          ', "amount": "' +
          this.addedAmount +
          '"}',
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    onClick() {
      this.postData();
    },
    postData() {
      fetch("http://localhost:3000/budget", {
        body:
          '{"activity": "' +
          this.addedActivity +
          '"' +
          ', "amount": "' +
          this.addedAmount +
          '"}',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
    },
    renderBudgetList() {
      fetch("http://localhost:3000/budget")
        .then(response => response.json())
        .then(result => {
          this.budget = result;
        });
    }
  }
};
</script>

<style scoped>
.test-form {
  padding: 1rem;
}

.test-form input {
  border: 0.5px solid grey;
  border-radius: 2px;
  margin: 0.2rem;
  padding: 0.2rem;
}
</style>