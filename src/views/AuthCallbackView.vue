<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
authStore.handleAuthCallback();
</script>

<template>
  <div class="h-100 pa-4">
    <LoadingSpinner />
  </div>
</template>
