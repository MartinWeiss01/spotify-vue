<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { onMounted } from 'vue';




const userStore = useUserStore();



onMounted(() =>{
  userStore.getRecentlyPlayed();
})





</script>

  

<template>
  <div class="pa-4">
    <span> <h1>Your recently played songs:</h1> </span>
  </div>

  <div class="mt-10">
    <ul>
    <li v-for="(track, index) in userStore.recentlyPlayed.items" :key="index">
      {{ track.track.name }} by {{ track.track.artists[0].name }} 
    </li>
  </ul>
  </div>
  
</template>
