<script setup lang="ts">
import type { RecentlyPlayedItem } from "@/model/RecentlyPlayed";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";
import { formatDate } from "@/utils/dateutils";
import TrackSkeleton from "@/components/recentlyplayed/TrackSkeleton.vue";
import TrackItem from "@/components/recentlyplayed/TrackItem.vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getRecentlyPlayed();
});

const groupedTracks = computed(() => {
  const groups: { [date: string]: RecentlyPlayedItem[] } = {};

  userStore.recentlyPlayed.items.forEach(track => {
    const date = formatDate(track.played_at);

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(track);
  });

  return groups;
});
</script>

<template>
  <div class="pa-4 d-flex justify-center flex-column">
    <h1>Recently Played</h1>

    <div v-if="userStore.recentlyPlayed.loading === true" class="mt-4">
      <TrackSkeleton v-for="i in 8" :key="i" class="mb-2" />
    </div>

    <div v-else>
      <div
        v-if="userStore.recentlyPlayed.items.length !== 0"
        v-for="(group, date) in groupedTracks"
        :key="date"
        class="mt-4"
      >
        <h2>{{ date }}</h2>
        <v-divider class="my-3"></v-divider>

        <TrackItem
          v-for="(track, index) in group"
          :key="index"
          :track="track"
          class="d-flex flex-column flex-sm-row justify-sm-space-between align-sm-center mb-2"
        ></TrackItem>
      </div>

      <div v-else class="mt-4">
        <p>No tracks found</p>
      </div>
    </div>
  </div>
</template>
