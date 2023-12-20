<template>
  <nav v-if="showNavigation()">
    <router-link to="/">Catan</router-link> |
    <router-link to="/session">Session</router-link>
  </nav>
  <router-view />
</template>

<script setup>

// Router importieren
import { useRoute } from 'vue-router'

const showNavigation = () => {
  return useRoute().meta.showNavigation;

}

</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  place-items: flex-start;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  display: flex;
  flex-direction: column;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>