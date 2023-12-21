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
  align-items: center;
  color: #2c3e50;

  margin: 0;
  padding: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  width: 100%;
}

h1 {
  margin: 1em 0;
}

h2 {
  margin-bottom: 0.5em;
}


button {
  padding: 10px 16px;
  background-color: #42b983;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  font-size: 14px;
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