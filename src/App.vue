<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
  <header>
    <nav>
      <router-link to="/">News</router-link>
      <router-link to="/fav">Favorite</router-link>
    </nav>
  </header>

  <router-view></router-view>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav {
  width: 100%;
  font-size: 1.2rem;
  text-align: center;
  margin: 0.8rem auto;
}

nav a {
  display: inline-block;

  width: 6rem;
  height: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;

  border-radius: 15px;
  background-color: rgb(190, 190, 190);
}

nav a:hover {
  box-shadow: 2px 2px 4px black;
}
</style>
