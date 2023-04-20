<script setup lang="ts">
const props = defineProps<{
  artwork: string;
}>();
</script>

<template>
  <v-slide-group-item>
    <div class="ml-4">
      <v-img :width="200" :aspect-ratio="1" :src="props.artwork" cover>
        <template v-slot:placeholder>
          <div
            class="d-flex align-center justify-center fill-height bg-primary"
          >
            <v-progress-circular
              indeterminate
              color="white"
            ></v-progress-circular>
          </div>
        </template>
      </v-img>

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
