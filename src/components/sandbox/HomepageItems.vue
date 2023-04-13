<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import PlaceholderItemVue from "./PlaceholderItem.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const userStore = useUserStore();
const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has("error")) {
  // After login attempt, denied by user
  console.error(
    `[App >> HomepageItems] Access denied by user: {error: ${urlParams.get(
      "error"
    )}, state: ${urlParams.get("state")}}`
  );
} else if (urlParams.has("code")) {
  // After login attempt, accepted by user
  console.info(
    `[App >> HomepageItems] Access granted by user: {state: ${urlParams.get(
      "state"
    )}, code: ${urlParams.get("code")}}`
  );
  authStore.requestAccessToken();
} else {
  if (authStore.user.isLoggedIn) {
    // Logged in
    console.log(
      `[App >> HomepageItems] User is logged in: {user: ${authStore.user}}`
    );
  } else {
    // Not logged in
    console.log(`[App >> HomepageItems] User is not logged in`);
  }
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
