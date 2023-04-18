<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";
import Header from "./components/layout/Header.vue";
import Footer from "./components/layout/Footer.vue";

const authStore = useAuthStore();
onMounted(() => {
  authStore.initUser();
});
</script>

<template>
  <v-app>
    <Header />
    <v-main class="main-bg">
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<style scoped>
.main-bg {
  background-color: #1a1a1a;
  color: #fff;
}
</style>
