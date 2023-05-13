<script setup lang="ts">
import type { TimeRange } from "@/model/TimeRange";

const props = defineProps<{
  currentTimeRange: string;
  time_ranges: TimeRange[];
}>();

const emit = defineEmits({
  updateTimeRange: (timeRange: TimeRange) => true,
});
</script>

<template>
  <v-row justify="center">
    <v-btn-toggle v-model="props.currentTimeRange" mandatory divided>
      <v-btn
        v-for="timeRange in props.time_ranges"
        :key="timeRange.value"
        :value="timeRange.value"
        @click="emit('updateTimeRange', timeRange)"
        class="bg-grey-darken-4 text-body-2 font-weight-bold px-sm-10"
        selected-class="bg-spotify"
      >
        {{ timeRange.label }}
      </v-btn>
    </v-btn-toggle>
  </v-row>
</template>
