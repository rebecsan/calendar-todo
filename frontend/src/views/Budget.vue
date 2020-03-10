<template>
  <div id="budget">
    <form class="test-form">
      <input type="text" v-model="addedActivity" />
      <input type="text" v-model="addedAmount" />
      <input type="submit" @click.prevent="onClick" />
    </form>
    <p>{{addedActivity}}: {{addedAmount}}</p>
    <div id="status"></div>
  </div>
</template>

<script>
export default {
  name: "Budget",
  data() {
    return {
      inputs: [],
      addedActivity: null,
      addedAmount: null
    };
  },
  methods: {
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