<script setup lang="ts">
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
authStore.handleAuthCallback();
</script>

<template>
  <LoadingSpinner />
</template>
