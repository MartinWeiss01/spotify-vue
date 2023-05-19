<script setup lang="ts">
import { getSimilarityActionDescription } from "@/utils/playlist";

const props = defineProps({
  similarityLevel: {
    type: Number,
    required: true,
  },
});
</script>

<template>
  <div class="text-h6">Select minimum similarity level</div>
  <div class="text-caption">
    {{ getSimilarityActionDescription(similarityLevel) }}
  </div>

  <v-slider
    :model-value="props.similarityLevel"
    @update:model-value="$emit('update:similarityLevel', $event)"
    :ticks="{ 1: '1', 2: '2', 3: '3', 4: '4' }"
    :max="4"
    :min="1"
    step="1"
    show-ticks="always"
    tick-size="4"
    thumb-color="primary"
  ></v-slider>
</template>
