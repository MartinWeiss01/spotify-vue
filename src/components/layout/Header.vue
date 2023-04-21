<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import { reactive } from "vue";

const authStore = useAuthStore();

const user = reactive(authStore.user);
</script>

<template>
  <header
    v-if="user.isLoggedIn"
    class="d-flex justify-space-between bg-grey-darken-4 px-4 py-4"
  >
    <p
      class="d-flex justify-between align-center text-center text-grey-darken-1 font-weight-bold"
    >
      LOGO
    </p>

    <div class="d-flex justify-between align-center">
      <nav class="d-flex"></nav>

      <div class="d-flex justify-between align-center">
        <div class="d-flex align-center">
          <v-img
            width="30"
            height="100%"
            cover
            class="rounded-xl"
            :src="user?.image || 'https://placehold.co/500x500?text=UU'"
          ></v-img>
          <p class="text-grey-darken-1 font-weight-bold mr-5">
            {{ user?.name }}
          </p>
        </div>
        <v-btn
          depressed
          color="primary"
          class="text-none"
          @click="authStore.logout()"
        >
          Sign Out
        </v-btn>
      </div>
    </div>
  </header>

  <header v-else class="flex-column bg-grey-darken-4 px-4 py-8">
    <p class="text-center text-grey-darken-1 font-weight-bold">LOGO</p>
  </header>
</template>
