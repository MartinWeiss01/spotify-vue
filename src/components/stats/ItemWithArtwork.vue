<script setup lang="ts">
const props = defineProps<{
  artwork: string;
}>();
</script>

<template>
  <v-slide-group-item>
    <div class="mr-4">
      <v-img :width="200" :aspect-ratio="1" :src="props.artwork" cover />

      <div class="item-width">
        <slot name="description"></slot>
      </div>
    </div>
  </v-slide-group-item>
</template>

<style scoped>
.item-width {
  width: 200px;
}
</style>
