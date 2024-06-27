<script setup>
// import MenuBar from "./components/MenuBar.vue";
</script>

<template>
  <v-app :style="{ background: '#F4F4F4' }">
    <MenuBar :key="$route.fullPath" />
    <h3 :style="{ color: '#000000' }"> Home page for Resume Generation</h3>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
