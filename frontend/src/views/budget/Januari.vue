<template>
  <div>
    <!-- Header: Inkomster -->
    <header class="budget-section-header">
      <p class="display-hide" @click="newInput" v-if="!display">+</p>
      <p class="display-hide" @click="close" v-if="display">-</p>
      <h2 class="title">Inkomster</h2>
      <p class="amount">{{}} kr</p>
    </header>

    <!-- Display: Inkomster -->
    <div v-if="display" class="show-hide">
      <div class="budget-items" v-for="item in budget" :key="item.id">
        <p>{{item.name}}</p>
        <p>{{item.sum}}</p>
      </div>

      <!-- Input -->
      <div class="inputs">
        <div class="input-option">
          <input type="text" list="inkomst" placeholder="Inkomstskälla" v-model="name" required />
          <datalist id="inkomst">
            <option value="Arbetslöshetsersättning">Arbetslöshetsersättning</option>
            <option value="Barnbidrag">Barnbidrag</option>
            <option value="Bostadsbidrag">Bostadsbidrag</option>
            <option value="Förmåner">Förmåner</option>
            <option value="Kapitalinkomster">Kapitalinkomster</option>
            <option value="Lön">Lön</option>
            <option value="Pension">Pension</option>
            <option value="Sjuk-/föräldrapenning">Sjuk-/föräldrapenning</option>
            <option value="Sjuk-/aktivitetsersättning">Sjuk-/aktivitetsersättning</option>
            <option value="Studiestöd">Studiestöd</option>
            <option value="Vårdbidrag">Vårdbidrag</option>
            <option value="Underhållsbidrag">Underhållsbidrag</option>
            <option value="Övriga skattefria inkomster">Övriga skattefria inkomster</option>
          </datalist>
        </div>
        <input
          class="input-amount"
          type="text"
          placeholder="summa (kr)"
          v-model="sum"
          @keydown.enter.prevent="postAndRender"
          required
        />
        <input type="button" value="Lägg till" @click.prevent="postAndRender" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.renderLists();
  },
  data() {
    return {
      budget: null,
      name: null,
      sum: null,
      display: false
    };
  },
  name: "Januari",
  methods: {
    newInput() {
      this.display = true;
    },
    close() {
      this.display = false;
    },
    postAndRender() {
      this.postData();
    },
    postData() {
      fetch("http://localhost:3000/budget", {
        body: '{"name": "' + this.name + '"' + ', "sum": "' + this.sum + '"}',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      });
      this.renderLists();
    },
    renderLists() {
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
/* Headers */
.budget-section-header {
  width: 80%;
  margin: 2rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  padding: 0.2rem 2rem;
}

.display-hide {
  width: 25%;
  font-size: 1.6em;
  text-align: center;
  cursor: pointer;
}

.title {
  width: 50%;
  font-size: 1.2em;
  font-weight: 300;
}

.amount {
  width: 25%;
  text-align: right;
}

/* Content */
.budget-items {
  width: 80%;
  margin: 0.5rem auto;
  padding: 0.4rem 0.2 rem;
  display: flex;
  background-color: white;
}
/* Inputs */

.inputs {
  width: 80%;
  margin: auto;
  display: flex;
}

input {
  background-color: white;
  border: 1px solid white;
  border-radius: 3px;
  margin-right: 1rem;
  padding: 0.3rem;
}
</style>