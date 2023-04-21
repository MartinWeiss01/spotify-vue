<script setup lang="ts">
import { TimeRange } from "@/model/TimeRange";

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
    <v-btn-toggle v-model="props.currentTimeRange" mandatory>
      <v-btn
        v-for="timeRange in props.time_ranges"
        :key="timeRange.value"
        :value="timeRange"
        @click="emit('updateTimeRange', timeRange)"
        class="text-body-2 font-weight-bold mr-1 px-10"
      >
        {{ timeRange.label }}
      </v-btn>
    </v-btn-toggle>
  </v-row>
</template>
