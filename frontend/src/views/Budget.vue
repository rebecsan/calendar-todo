<template>
  <div id="budget">
    <h2 class="budget-header">Budget</h2>
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
  </div>
</template>

<script>
export default {
  name: "Budget"
};
</script>

<style scoped>
.budget-header {
  font-family: "Bebas Neue", cursive;
  font-size: 2.2em;
  width: 80%;
  margin: 4rem auto 2rem;
  letter-spacing: 1px;
}

#budget-container {
  background-color: #afcbcf;
  width: 80%;
  margin: 4rem auto 5rem;
  padding-bottom: 1rem;
}
#router-links {
  display: flex;
  justify-content: space-between;
  margin: 3rem auto;
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
  background-color: #afcbcf;
}
</style>