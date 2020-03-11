<template>
  <div id="budget">
    <div id="budget-container">
      <nav id="router-links">
        <router-link class="router-link" to="/Budget/Januari" exact>Jan</router-link>
        <router-link class="router-link" to="/Budget/Februari" exact>Feb</router-link>
        <router-link class="router-link" to="/Budget/Mars" exact>Mar</router-link>
        <router-link class="router-link" to="/Budget/April" exact>Apr</router-link>
        <router-link class="router-link" to="/Budget/Maj" exact>Maj</router-link>
        <router-link class="router-link" to="/Budget/Juni" exact>Jun</router-link>
        <router-link class="router-link" to="/Budget/Juli" exact>Jul</router-link>
        <router-link class="router-link" to="/Budget/Augusti" exact>Aug</router-link>
        <router-link class="router-link" to="/Budget/September" exact>Sep</router-link>
        <router-link class="router-link" to="/Budget/Oktober" exact>Okt</router-link>
        <router-link class="router-link" to="/Budget/November" exact>Nov</router-link>
        <router-link class="router-link" to="/Budget/December" exact>Dec</router-link>
      </nav>

      <router-view></router-view>
    </div>

    <!-- <form class="test-form">
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
    </ul>-->
  </div>
</template>

<script>
export default {
  name: "Budget"
  // created() {
  //   this.renderBudgetList();
  // },
  // data() {
  //   return {
  //     addedActivity: null,
  //     addedAmount: null,
  //     budget: null
  //   };
  // },
  // methods: {
  //   deleteItem() {
  //     fetch("http://localhost:3000/budget", {
  //       body:
  //         '{"activity": "' +
  //         this.addedActivity +
  //         '"' +
  //         ', "amount": "' +
  //         this.addedAmount +
  //         '"}',
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //   },
  //   onClick() {
  //     this.postData();
  //   },
  //   postData() {
  //     fetch("http://localhost:3000/budget", {
  //       body:
  //         '{"activity": "' +
  //         this.addedActivity +
  //         '"' +
  //         ', "amount": "' +
  //         this.addedAmount +
  //         '"}',
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     });
  //   },
  //   renderBudgetList() {
  //     fetch("http://localhost:3000/budget")
  //       .then(response => response.json())
  //       .then(result => {
  //         this.budget = result;
  //       });
  //   }
  // }
};
</script>

<style scoped>
#budget-container {
  background-color: #a3dcd6;
  width: 70%;
  margin: 5rem auto;
  padding-bottom: 2rem;
}
#router-links {
  display: flex;
  justify-content: space-between;
  margin: 1rem auto;
}

.router-link {
  width: 100%;
  text-align: center;
  text-decoration: none !important;
  color: black;
  background-color: white;
  padding: 0.5rem 0;
}

.router-link-active {
  background-color: #a3dcd6;
}

/* .test-form {
  padding: 1rem;
}

.test-form input {
  border: 0.5px solid grey;
  border-radius: 2px;
  margin: 0.2rem;
  padding: 0.2rem;
} */
</style>