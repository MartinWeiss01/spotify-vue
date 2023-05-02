<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted } from 'vue';




const userStore = useUserStore();



onMounted(() =>{
  userStore.getRecentlyPlayed();
})


const formatDate = (timestamp: Date) => {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  return `${month}-${day}-${year}`;
};



const groupedTracks = computed(() => {
  const groups: {[date: string]: any[]} = {};
  
  userStore.recentlyPlayed.items.forEach((track) => {
    const date = formatDate(track.played_at);
    
    if (!groups[date]) {
      groups[date] = [];
    }
    
    groups[date].push(track);
  });
  
  return groups;
});

//<v-card-title>{{ track.track.name }}</v-card-title>
//<v-card-subtitle>{{ track.track.artists[0].name }}

</script>

  

<template>








<div class="mt-10">

  <h1>Your recently played songs: </h1> <br>
  <div v-for="(group, date) in groupedTracks" :key="date">
    <h2>{{ date }}</h2>
    
      <div >
        <div></div>
        <v-col v-for="(track, index) in group" :key="index" cols="10">
              
          <v-row>
              <v-img class="album-image" :src="track.track.album.images[0].url" height="50"></v-img>
              <v-col>
              <p class="track-name">{{ track.track.name }}</p>
              <p class="artist-name">{{track.track.artists[0].name}}</p>
              </v-col>
            </v-row>
        </v-col>
      </div>
    
  </div>
</div>
  
</template>
