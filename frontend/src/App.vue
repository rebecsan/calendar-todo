<template>
  <div id="app">
    <p>Här i App.vue komponenten kan vi ha det innehåll som vi vill ska finnas med på alla sidor (t.ex navbar och footer)</p>

    <nav>
      <router-link class="router-link" :to="{name: 'Home'}" exact>Hem</router-link>
      <router-link class="router-link" to="/Todo" exact>Todo</router-link>
      <router-link class="router-link" to="/Calendar" exact>Kalender</router-link>
      <router-link class="router-link" to="/Budget" exact>Budget</router-link>
    </nav>
    <router-view></router-view>
  </div>

  <!-- VUETIFY -->
  <!-- <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <HelloWorld />
    </v-content>
  </v-app>-->
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    //HelloWorld
  },

  data: () => ({
    //
  })
};

</script>

<style>
/* CSS RESET */

/* Box Sizing 
---------------*/
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}

/* Reset margins and paddings on most elements 
------------------------------------------------*/
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

/* Removes discs from ul 
---------------------------*/
ul {
  list-style: none;
}

/* Forms and buttons 
-----------------------*/
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

/* Media Elements 
--------------------*/
embed,
iframe,
img,
object,
video {
  display: block;
  max-width: 100%;
}
</style>
