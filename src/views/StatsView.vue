<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import YourTaste from "@/components/stats/YourTaste.vue";
import YourTopTracks from "@/components/stats/YourTopTracks.vue";
import YourTastePlaceholder from "@/components/stats/YourTastePlaceholder.vue";
import YourTopArtists from "@/components/stats/YourTopArtists.vue";
import MediaItemSkeleton from "@/components/stats/MediaItemSkeleton.vue";
import DateToggleButton from "@/components/DateToggleButton.vue";
import type { TimeRange } from "@/model/TimeRange";
import { onMounted } from "vue";

const userStore = useUserStore();

onMounted(() => {
  userStore.getTopArtists();
  userStore.getTopTracks();
});

const onTimeRangeChange = (timeRange: TimeRange) => {
  if (timeRange.value != userStore.currentTimeRange) {
    userStore.changeTimeRange(timeRange);
  }
};
</script>

<template>
  <div class="flex-column">
    <DateToggleButton
      :currentTimeRange="userStore.currentTimeRange"
      :time_ranges="userStore.TIME_RANGES"
      @updateTimeRange="onTimeRangeChange"
      class="mt-10"
    />

    <div class="mt-10">
      <YourTopArtists
        v-if="userStore.topArtists.loading === false"
        :artists="userStore.topArtists.items"
      />
      <MediaItemSkeleton title="Your Top Artists" v-else />
    </div>

    <div class="mt-10">
      <YourTopTracks
        v-if="userStore.topTracks.loading === false"
        :tracks="userStore.topTracks.items"
      />
      <MediaItemSkeleton title="Your Top Tracks" v-else />
    </div>

    <div class="mt-10 mb-10">
      <YourTaste
        v-if="
          userStore.topArtists.loading === false &&
          userStore.topArtists.parsingGenres === false
        "
        :genres="userStore.topArtists.genres"
      />
      <YourTastePlaceholder v-else />
    </div>
  </div>
</template>
