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
    <v-main>
      <v-container class="h-100 pa-0">
        <RouterView />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>
