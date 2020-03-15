<template>
  <div>
    <!-- INCOMINGS -->
    <section class="budget-section incomings">
      <!-- Header: Inkomster -->
      <header class="budget-section-header">
        <h3 class="title">
          <span class="plus" v-if="incomeClosed" @click="displayIncome">+</span>
          <span class="minus" v-if="!incomeClosed" @click="hideIncome">-</span>Inkomster
        </h3>
        <p class="amount">{{totalIncome}} kr</p>
      </header>

      <!-- Display: Inkomster -->
      <div v-if="!incomeClosed" class="display">
        <div class="budget-item" v-for="income in incomings" :key="income.id">
          <p>{{income.name}}</p>
          <p>
            {{income.sum}} kr
            <span
              class="delete"
              @click.prevent="deleteIncomeData(income.id)"
            >&#x2718;</span>
          </p>
        </div>

        <!-- Input -->
        <div class="inputs">
          <div class="input-option">
            <input
              type="text"
              list="inkomst"
              placeholder="Inkomstskälla"
              v-model="incomeName"
              required
            />
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
            v-model="incomeSum"
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
    </section>

    <!-- LIVING -->
    <section class="budget-section living">
      <!-- Header: Boende -->
      <header class="budget-section-header">
        <h3 class="title">
          <span class="plus" v-if="livingClosed" @click="displayLiving">+</span>
          <span class="minus" v-if="!livingClosed" @click="hideLiving">-</span>Boende
        </h3>
        <p class="amount">{{totalLiving}} kr</p>
      </header>

      <!-- Display: Boende -->
      <div v-if="!livingClosed" class="display">
        <div class="budget-item" v-for="item in living" :key="item.id">
          <p>{{item.name}}</p>
          <p>
            {{item.sum}} kr
            <span class="delete" @click.prevent="deleteLivingData(item.id)">&#x2718;</span>
          </p>
        </div>

        <!-- Input -->
        <div class="inputs">
          <div class="input-option">
            <input
              type="text"
              list="living"
              placeholder="Boendekostnad"
              v-model="livingName"
              required
            />
            <datalist id="living">
              <option value="Hyra">Hyra</option>
              <option value="Värme">Värme</option>
              <option value="Hushållsel">Hushållsel</option>
              <option value="Vatten och avlopp">Vatten och avlopp</option>
              <option value="Hemförsäkring">Hemförsäkring</option>
              <option value="Lån">Lån</option>
              <option value="Underhåll/reparationer">Underhåll/reparationer</option>
            </datalist>
          </div>
          <input
            class="input-amount"
            type="text"
            placeholder="summa (kr)"
            v-model="livingSum"
            @keydown.enter.prevent="postLivingData"
            required
          />
          <input
            type="button"
            value="Lägg till"
            class="add-item-button"
            @click.prevent="postLivingData"
          />
        </div>
      </div>
    </section>
    <div class="total-container">
      <p class="total">Totalsumma: {{totalSum}} kr</p>
    </div>
  </div>
</template>
-->

<script>
export default {
  created() {
    this.renderIncome();
    this.renderLiving();
  },
  data() {
    return {
      //Income
      incomings: null,
      incomeName: null,
      incomeSum: null,
      incomeClosed: true,
      totalIncome: null,

      //Living
      living: null,
      livingName: null,
      livingSum: null,
      livingClosed: true,
      totalLiving: null,
      test: "living",

      totalSum: null,
      initialValue: 0
    };
  },
  name: "Januari",
  methods: {
    // Income
    calculateIncome() {
      this.totalIncome = this.incomings.reduce(function(total, currentValue) {
        return total + currentValue.sum;
      }, this.initialValue);
      this.calculateTotalSum();
    },
    displayIncome() {
      this.incomeClosed = false;
    },
    hideIncome() {
      this.incomeClosed = true;
    },
    postIncomeData() {
      fetch("http://localhost:3000/incomings", {
        body: JSON.stringify({
          name: this.incomeName,
          sum: this.incomeSum
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.renderIncome();
      });
    },
    deleteIncomeData(id) {
      fetch("http://localhost:3000/incomings/" + id, {
        method: "DELETE"
      }).then(response => {
        this.renderIncome();
      });
    },
    renderIncome() {
      fetch("http://localhost:3000/incomings")
        .then(response => response.json())
        .then(result => {
          this.incomings = result;
          this.calculateIncome();
        });
    },

    //Living
    displayLiving() {
      this.livingClosed = false;
    },
    hideLiving() {
      this.livingClosed = true;
    },
    calculateLiving() {
      this.totalLiving = this.living.reduce(function(total, currentValue) {
        return total + currentValue.sum;
      }, this.initialValue);
      this.calculateTotalSum();
    },

    postLivingData() {
      fetch("http://localhost:3000/living", {
        body: JSON.stringify({
          test: this.test,
          name: this.livingName,
          sum: this.livingSum
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(response => {
        this.renderLiving();
      });
    },

    renderLiving() {
      fetch("http://localhost:3000/living")
        .then(response => response.json())
        .then(result => {
          this.living = result;
          this.calculateLiving();
        });
    },
    deleteLivingData(id) {
      fetch("http://localhost:3000/living/" + id, {
        method: "DELETE"
      }).then(response => {
        this.renderLiving();
      });
    },
    calculateTotalSum() {
      this.totalSum = this.totalIncome - this.totalLiving;
    }
  }
};
</script>

<style scoped>
/* Section Headers */
.budget-section-header {
  width: 80%;
  margin: 1.5rem auto 0;
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

.total-container {
  width: 80%;
  margin: 2rem auto;
  display: flex;
  justify-content: flex-end;
}
.total {
  width: 15rem;
  padding: 0.5rem 1rem;
  border-top: 2px solid #507f85;
  font-weight: 600;
  text-align: right;
}
</style>