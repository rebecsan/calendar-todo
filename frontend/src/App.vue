<template>
  <div id="app">
    <!-- Small Sidebar -->
    <div class="small-sidebar" v-if="smallSidebar">
      <nav>
        <img
          src="./assets/larger-symbol.png"
          alt="large sidebar"
          class="larger-symbol"
          @click="displayLarger"
        />
        <router-link class="main-router-link" :to="{name: 'Home'}" @click.native="navHome" exact>
          <img v-if="!homeActive" :src="homeSymbol" alt="home" class="symbols" />
          <img v-if="homeActive" :src="homeSymbolActive" alt="home" class="symbols" />
        </router-link>
        <router-link class="main-router-link" to="/Todo" @click.native="navTodo">
          <img v-if="!todoActive" :src="todoSymbol" alt="todo" class="symbols" />
          <img v-if="todoActive" :src="todoSymbolActive" alt="todo" class="symbols" />
        </router-link>
        <router-link class="main-router-link" to="/Calendar" @click.native="navCalendar">
          <img v-if="!calendarActive" :src="calendarSymbol" alt="calendar" class="symbols" />
          <img v-if="calendarActive" :src="calendarSymbolActive" alt="calendar" class="symbols" />
        </router-link>
        <router-link class="main-router-link" to="/Budget/Januari" @click.native="navBudget">
          <img v-if="!budgetActive" :src="budgetSymbol" alt="budget" class="symbols" />
          <img v-if="budgetActive" :src="budgetSymbolActive" alt="budget" class="symbols" />
        </router-link>
      </nav>
    </div>

    <!-- Large Sidebar -->
    <div class="large-sidebar" v-else>
      <nav>
        <img
          src="./assets/smaller-symbol.png"
          alt="small sidebar"
          class="smaller-symbol"
          @click="displaySmaller"
        />
        <router-link class="main-router-link" :to="{name: 'Home'}" @click.native="navHome" exact>
          <img v-if="!homeActive" :src="homeSymbol" alt="home" class="symbols" />
          <img v-if="homeActive" :src="homeSymbolActive" alt="home" class="symbols" /> Hem
        </router-link>
        <router-link class="main-router-link" to="/Todo" @click.native="navTodo">
          <img v-if="!todoActive" :src="todoSymbol" alt="todo" class="symbols" />
          <img v-if="todoActive" :src="todoSymbolActive" alt="todo" class="symbols" /> Todo
        </router-link>
        <router-link class="main-router-link" to="/Calendar" @click.native="navCalendar">
          <img v-if="!calendarActive" :src="calendarSymbol" alt="calendar" class="symbols" />
          <img v-if="calendarActive" :src="calendarSymbolActive" alt="calendar" class="symbols" />Kalender
        </router-link>
        <router-link class="main-router-link" to="/Budget/Januari" @click.native="navBudget">
          <img v-if="!budgetActive" :src="budgetSymbol" alt="budget" class="symbols" />
          <img v-if="budgetActive" :src="budgetSymbolActive" alt="budget" class="symbols" />Budget
        </router-link>
      </nav>
    </div>

    <div class="main-page">
      <!-- Header -->
      <header class="main-header">
        <h1>
          <router-link class="home-router-link" :to="{name: 'Home'}" @click.native="navHome" exact>
            <img src="./assets/logo.png" alt="logo" class="logo" />Hjälpredan
          </router-link>
        </h1>
      </header>

      <!-- Router-view -->
      <router-view class="page"></router-view>

      <!-- Footer -->
      <footer class="main-footer">
        <p class="copyright">Copyright &#9400; Hjälpredan</p>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //Images
      homeSymbol: require("./assets/home.png"),
      homeSymbolActive: require("./assets/home-yellow.png"),
      todoSymbol: require("./assets/checkbox.png"),
      todoSymbolActive: require("./assets/checkbox-yellow.png"),
      calendarSymbol: require("./assets/calendar.png"),
      calendarSymbolActive: require("./assets/calendar-yellow.png"),
      budgetSymbol: require("./assets/budget.png"),
      budgetSymbolActive: require("./assets/budget-yellow.png"),
      //Booleans
      smallSidebar: true,
      homeActive: true,
      todoActive: false,
      calendarActive: false,
      budgetActive: false
    };
  },
  name: "App",
  methods: {
    //Display Small/Large Sidebar
    displayLarger() {
      this.smallSidebar = false;
    },
    displaySmaller() {
      this.smallSidebar = true;
    },
    //Click Event
    navHome() {
      this.homeActive = true;
      this.todoActive = false;
      this.calendarActive = false;
      this.budgetActive = false;
    },
    navTodo() {
      this.homeActive = false;
      this.todoActive = true;
      this.calendarActive = false;
      this.budgetActive = false;
    },
    navCalendar() {
      this.homeActive = false;
      this.todoActive = false;
      this.calendarActive = true;
      this.budgetActive = false;
    },
    navBudget() {
      this.homeActive = false;
      this.todoActive = false;
      this.calendarActive = false;
      this.budgetActive = true;
    }
  }
};
</script>

<style>
/* CSS RESET
-----------------------------*/

/* Box Sizing  */
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Fonts */
@import url("https://fonts.googleapis.com/css?family=Bebas+Neue|Open+Sans:300,400,600&display=swap");

/* 
font-family: 'Bebas Neue', cursive;
font-family: 'Open Sans', sans-serif; 
*/

html {
  font-family: "Open Sans", sans-serif;
  color: black;
}

/* Reset margins and paddings on most elements  */
body,
h1,
h2,
h3,
h4,
h5,
h6,
ul,
ol,
li,
p,
pre,
blockquote,
figure,
hr {
  margin: 0;
  padding: 0;
}

/* Removes discs from ul */
ul {
  list-style: none;
}

/* Forms and buttons */
input,
textarea,
select,
button {
  color: inherit;
  font: inherit;
  letter-spacing: inherit;
}

input,
textarea,
button {
  border: 1px solid gray;
}

button {
  border-radius: 0;
  padding: 0.75em 1em;
  background-color: transparent;
}

button * {
  pointer-events: none;
}

/* Media Elements */
embed,
iframe,
img,
object,
video {
  display: block;
  max-width: 100%;
}

/* MAIN PAGE
-------------------------------------*/

#app {
  display: flex;
}

.main-page {
  width: 100%;
}

/* Large Sidebar */
.large-sidebar {
  width: 16rem;
  height: auto;
  background-color: #507f85;
  display: inline-block;
  padding: 6rem 2rem 3rem;
  position: relative;
}
.main-router-link {
  color: white;
  display: block;
  text-decoration: none;
  margin: 1.4rem 0;
  font-size: 1.1em;
}

/* Small Sidebar */
.small-sidebar {
  width: 4rem;
  height: auto;
  background-color: #507f85;
  display: inline-block;
  padding: 6rem 1rem 3rem;
  position: relative;
}

/* Sidebars */

.smaller-symbol,
.larger-symbol {
  width: 2rem;
  position: absolute;
  top: 2rem;
  right: 1rem;
  cursor: pointer;
}

.symbols {
  width: 1.5rem;
  display: inline-block;
  margin: 0 0.6rem -0.28rem 0;
}

/* Header */
.main-header {
  text-align: left;
  width: 100%;
  height: 6rem;
  border-bottom: 2px solid #507f85;
}

.logo {
  width: 3rem;
  display: inline-block;
  margin: 0 1rem -0.7rem 1rem;
}
.home-router-link {
  color: #333333;
  text-decoration: underline;
  text-decoration-color: #e4b445;
}

.main-header h1 {
  padding: 1.5rem;
  font-family: "Bebas Neue", cursive;
  font-size: 2.4em;
  letter-spacing: 2px;
}

/* Footer */
.main-footer {
  text-align: center;
  background-color: #d6d2b5;
}
.copyright {
  padding: 1rem;
}
</style>
