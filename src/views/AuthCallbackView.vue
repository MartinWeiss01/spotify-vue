<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
authStore.handleAuthCallback();
</script>

<template>
  <div class="d-flex justify-center h-100 align-center">
    <v-progress-circular
      color="primary"
      indeterminate
      :size="86"
      :width="8"
    ></v-progress-circular>
  </div>
</template>
