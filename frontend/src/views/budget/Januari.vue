<template>
  <div>
    <!-- Header: Inkomster -->
    <header class="budget-section-header">
      <h3 class="title">
        <span class="plus" v-if="closed" @click="displayIncome">+</span>
        <span class="minus" v-if="!closed" @click="hideIncome">-</span>Inkomster
      </h3>
      <p class="amount">{{totalIncome}} kr</p>
    </header>

    <!-- Display: Inkomster -->
    <div v-if="!closed" class="budget-section">
      <div class="budget-item" v-for="income in incomings" :key="income.id">
        <p>{{income.name}}</p>
        <p>
          {{income.sum}} kr
          <span class="delete" @click.prevent="deleteData(income.id)">&#x2718;</span>
        </p>
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
          @keydown.enter.prevent="postIncomeData"
          required
        />
        <input
          type="button"
          value="Lägg till"
          class="add-item-button"
          @click.prevent="postIncomeData"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.renderIncome();
  },
  data() {
    return {
      incomings: null,
      name: null,
      sum: null,
      closed: true,
      totalIncome: null,
      initialValue: 0
    };
  },
  name: "Januari",
  methods: {
    calculateSum() {
      this.totalIncome = this.incomings.reduce(function(total, currentValue) {
        return total + currentValue.sum;
      }, this.initialValue);
    },
    displayIncome() {
      this.closed = false;
    },
    hideIncome() {
      this.closed = true;
    },
    postIncomeData() {
      fetch("http://localhost:3000/budget", {
        body: '{"name": "' + this.name + '"' + ', "sum": "' + this.sum + '"}',
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.renderIncome();
      });
    },

    deleteData(id) {
      fetch("http://localhost:3000/budget/" + id, {
        method: "DELETE"
      }).then(response => {
        this.renderIncome();
      });
    },

    renderIncome() {
      fetch("http://localhost:3000/budget")
        .then(response => response.json())
        .then(result => {
          this.incomings = result;
          this.calculateSum();
        });
    }
  }
};
</script>

<style scoped>
/* Section Headers */
.budget-section-header {
  width: 80%;
  margin: 3rem auto 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border: 1.5px solid #749fa5;
  border-radius: 2px;
  padding: 0.2rem 2.2rem;
}

.title {
  width: 70%;
  font-size: 1.1em;
  font-weight: 400;
}

.plus,
.minus {
  font-size: 1.5em;
  font-weight: 700;
  margin-right: 1.4rem;
  color: #e4b445;
  cursor: pointer;
}

.amount {
  width: 30%;
  text-align: right;
  font-size: 1.1em;
  font-weight: 600;
}

/* Section Items */
.budget-item {
  width: 80%;
  display: flex;
  justify-content: space-between;
  margin: 0.2rem auto;
  padding: 0.2rem 1rem 0 2.2rem;
  background-color: #f2f2f2;
  border: 1px solid #749fa5;
  border-radius: 2px;
}

.delete {
  color: #507f85;
  cursor: pointer;
  margin-left: 1rem;
}

/* Inputs */

.inputs {
  width: 80%;
  margin: 1.5rem auto;
  display: flex;
}

input {
  background-color: white;
  border: 1px solid #749fa5;
  border-radius: 3px;
  margin-right: 0.8rem;
  padding: 0.3rem;
}

.add-item-button {
  background-color: #e4b445;
  border: 1px solid #749fa5;
  color: white;
  margin-right: 0.8rem;
  padding: 0.3rem 1rem;
}
</style>