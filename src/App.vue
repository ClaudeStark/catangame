<template>
  <div class="navigationBackground">
    <nav v-if="showNavigation()">
      <router-link to="/" class="menuText">Catan</router-link>
      <router-link to="/rules" class="menuText">Spielablauf</router-link>
      <router-link to="/session" class="menuText">Sessions</router-link>
    </nav>
  </div>
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
  user-select: none;
  zoom: 1;
}


.navigationBackground {
  width: 100%;
  height: 8%;

  background-color: #1d4b3c;
}

.menuText {
  text-decoration: none;
  font-weight: 400;
  letter-spacing: 0.08em;

  margin-right: 1em;
}


body {
  margin: 0;
  padding: 0;
  place-items: flex-start;
}

#app {
  font-family: 'Work Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  align-items: center;

  margin: 0;
  padding: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
}

h1 {
  margin: 1em 0;
}

h2 {
  margin-bottom: 0.5em;
}


button {
  font-weight: 800;
  font-family: 'Raleway', sans-serif;
  color: white;
  letter-spacing: 0.05rem;
  padding: 1rem 2rem;
  background-color: #1D4B3C;
  border-radius: 100px;
  margin-top: 1rem;
  transition: ease-in-out 0.4s;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color:  #4B6F2B;
  transition: ease-in-out 0.4s;
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
  color: #fff;
  transition: ease-in-out 0.4s;
}

nav a.router-link-exact-active {
  color: #fadb42;
  transition: ease-in-out 0.4s;
}

nav a:hover {
  color: #A7C836;
  transition: ease-in-out 0.4s;
}
</style>