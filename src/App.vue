<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
onMounted(() => {
  authStore.initUser();
});
</script>

<template>
  <v-app>
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>
