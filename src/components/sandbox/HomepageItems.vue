<script setup lang="ts">
import PlaceholderItemVue from "./PlaceholderItem.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has("error")) {
  // After login attempt, denied by user
  console.error(
    `[ERROR] Access denied by user: ${urlParams.get(
      "error"
    )} with state ${urlParams.get("state")}`
  );
} else if (urlParams.has("code")) {
  // After login attempt, accepted by user
  console.info(
    `[INFO] Access granted by user with state ${urlParams.get(
      "state"
    )}}, requesting access token...`
  );
  authStore.requestAccessToken();
} else {
  /*
    May be logged in already, or just visiting the page for the first time.
  */
}

const spotifyAuth = () => {
  authStore.redirectToAuth();
};
</script>

<template>
  <v-card class="mx-auto card-bg pa-4" max-width="600">
    Template using slots
    <v-icon icon="mdi-logout"></v-icon>
    <PlaceholderItemVue class="white-bg d-flex justify-center">
      <template #title>This is H1</template>
      <template #description> This is paragraph</template>
    </PlaceholderItemVue>
  </v-card>

  <v-btn @click="spotifyAuth()">Login with Spotify</v-btn>
</template>

<style scoped>
.card-bg {
  background-color: #1d7efa;
}

.white-bg {
  background-color: white;
}
</style>
