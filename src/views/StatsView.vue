<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";
import YourTaste from "@/components/stats/YourTaste.vue";
import YourTopTracks from "@/components/stats/YourTopTracks.vue";
import YourTopTrackPlaceholder from "@/components/stats/YourTopTrackPlaceholder.vue";
import YourTastePlaceholder from "@/components/stats/YourTastePlaceholder.vue";

const userStore = useUserStore();
const topTracks = reactive(userStore.topTracks.items);

// Move to StatsView
if (topTracks.length === 0) {
  userStore.getTopTracks();
}
</script>

<template>
  <div class="flex-column">
    <YourTopTracks v-if="topTracks.length !== 0" :tracks="topTracks" />
    <YourTopTrackPlaceholder v-else />

    <YourTaste v-if="topTracks.length !== 0" />
    <YourTastePlaceholder v-else />
  </div>
</template>
