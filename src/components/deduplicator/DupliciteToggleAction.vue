<script setup lang="ts">
import { defineProps, watch, defineEmits, ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(["update:modelValue"]);

const value = ref(props.modelValue);

watch(value, newValue => {
  emit("update:modelValue", newValue);
});
</script>

<template>
  <div class="d-flex justify-center mt-4">
    <v-btn-toggle v-model="value" mandatory>
      <v-btn :value="false" color="spotify" size="small">
        <span class="text-caption text-uppercase font-weight-bold">Keep</span>
      </v-btn>
      <v-btn :value="true" color="red" size="small">
        <span class="text-caption text-uppercase font-weight-bold">Delete</span>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
