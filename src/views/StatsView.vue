<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";
import YourTaste from "@/components/stats/YourTaste.vue";
import YourTopTracks from "@/components/stats/YourTopTracks.vue";
import YourTopTrackPlaceholder from "@/components/stats/YourTopTrackPlaceholder.vue";
import YourTastePlaceholder from "@/components/stats/YourTastePlaceholder.vue";
import YourTopArtists from "@/components/stats/YourTopArtists.vue";
import YourTopArtistsPlaceholder from "@/components/stats/YourTopArtistsPlaceholder.vue";

const userStore = useUserStore();
const topArtists = reactive(userStore.topArtists.items);
const topTracks = reactive(userStore.topTracks.items);
const topGenres = reactive(userStore.topArtists.genres);

if (topTracks.length === 0) {
  userStore.getTopTracks();
}

if (topArtists.length === 0) {
  userStore.getTopArtists();
}
</script>

<template>
  <div class="flex-column">
    <YourTopArtists v-if="topArtists.length !== 0" :artists="topArtists" />
    <YourTopArtistsPlaceholder v-else />

    <YourTopTracks v-if="topTracks.length !== 0" :tracks="topTracks" />
    <YourTopTrackPlaceholder v-else />

    <YourTaste v-if="topArtists.length !== 0" :genres="topGenres" />
    <YourTastePlaceholder v-else />
  </div>
</template>
