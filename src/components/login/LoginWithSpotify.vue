<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const spotifyAuth = () => {
  authStore.redirectToAuth();
};
</script>

<template>
  <v-container>
    <v-row justify="center">
      <v-btn
        @click="spotifyAuth()"
        class="text-none font-weight-semibold bg-primary"
        rounded="xl"
        size="large"
        elevation="4"
        >Login with Spotify
      </v-btn>
    </v-row>
  </v-container>
</template>
