<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { reactive } from "vue";
import YourTaste from "@/components/stats/YourTaste.vue";
import YourTopTracks from "@/components/stats/YourTopTracks.vue";
import YourTastePlaceholder from "@/components/stats/YourTastePlaceholder.vue";
import YourTopArtists from "@/components/stats/YourTopArtists.vue";
import MediaItemSkeleton from "@/components/stats/MediaItemSkeleton.vue";
import DateToggleButton from "@/components/DateToggleButton.vue";

const userStore = useUserStore();
const time_ranges = reactive(userStore.TIME_RANGES);
//const currentTimeRa = ref(userStore.currentTimeRange.value)

if (userStore.topArtists.items.length === 0) {
  userStore.getTopTracks();
}

if (userStore.topTracks.items.length === 0) {
  userStore.getTopArtists();
}

const changeTimeRange = (index: number) => {
  //console.log(`curTimeRange Before ${userStore.currentTimeRange.value}`)
  if (userStore.TIME_RANGES[index] != userStore.currentTimeRange) {
    Object.assign(userStore.currentTimeRange, userStore.TIME_RANGES[index]);

    userStore.getTopArtists();
    userStore.getTopTracks();
  }
  //console.log(`curTimeRange After ${userStore.currentTimeRange.value}`)
};
</script>

<template>
  <div class="flex-column">
    <DateToggleButton
      :time_ranges="time_ranges"
      @get-time-range-index="changeTimeRange"
      class="mt-10"
    ></DateToggleButton>
    <!-- TODO fix Toggle Button  -->
    <div class="mt-10">
      <YourTopArtists
        v-if="userStore.topArtists.items.length !== 0"
        :artists="userStore.topArtists.items"
      />
      <MediaItemSkeleton title="Your Top Artists" v-else />
    </div>

    <div class="mt-10">
      <YourTopTracks
        v-if="userStore.topTracks.items.length !== 0"
        :tracks="userStore.topTracks.items"
      />
      <MediaItemSkeleton title="Your Top Tracks" v-else />
    </div>

    <div class="mt-10 mb-10">
      <YourTaste
        v-if="userStore.topArtists.items.length !== 0"
        :genres="userStore.topArtists.genres"
      />
      <YourTastePlaceholder v-else />
    </div>
  </div>
</template>
