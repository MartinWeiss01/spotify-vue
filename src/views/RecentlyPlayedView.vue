<script setup lang="ts">
import type { RecentlyPlayedItem } from "@/model/RecentlyPlayed";
import { useUserStore } from "@/stores/user";
import { computed, onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getRecentlyPlayed();
});

const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.toLocaleString("en-US", { month: "long" });
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
};

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

const getTimeAgoString = (timedate: Date): string => {
  const date = new Date(timedate);
  const now = new Date();
  const seconds = Math.round((now.valueOf() - date.valueOf()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};
</script>

<template>
  <div class="pa-4 d-flex justify-center flex-column">
    <h1>Recently Played</h1>

    <div v-for="(group, date) in groupedTracks" :key="date" class="mt-4">
      <h2>{{ date }}</h2>
      <v-divider class="my-3"></v-divider>

      <div
        v-for="(track, index) in group"
        :key="index"
        class="d-flex flex-column flex-sm-row justify-sm-space-between align-sm-center mb-2"
      >
        <div class="d-flex align-sm-center">
          <div>
            <v-img
              :width="60"
              :aspect-ratio="1"
              :src="
                track.track.album?.images[0]?.url ??
                '/fallbacks/no_album_image.svg'
              "
              cover
            ></v-img>
          </div>
          <div class="d-flex flex-column ml-4">
            <span class="track-name font-weight-bold">
              {{ track.track.name }}
            </span>
            <span class="artist-name">
              {{ track.track.artists.map(artist => artist.name).join(", ") }}
            </span>
            <small
              :title="`${track.played_at.toLocaleString()} UTC`"
              class="d-flex d-sm-none"
            >
              {{ getTimeAgoString(track.played_at) }}
            </small>
          </div>
        </div>

        <div>
          <span
            :title="`${track.played_at.toLocaleString()} UTC`"
            class="d-none d-sm-flex"
          >
            {{ getTimeAgoString(track.played_at) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
