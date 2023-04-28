<script setup lang="ts">
import { UserPlaylistsEndpoint,UserPlaylistItem} from '@/model/UserPlaylists';
import { ref } from 'vue';
import { onMounted } from 'vue';

    const props = defineProps<{
        playlists:UserPlaylistsEndpoint
    }>();
    const emits = defineEmits(['select-update'])
    
    
    // const names:string[] =props.playlists?.items?.map((item)=>{
    //     return item?.name
    // })
    
    const print= ()=>{
       console.log(chosenPlaylist.value?.name)
    }
    var chosenPlaylist= ref<UserPlaylistItem>()
    
    
</script>
<template>
    
        <!-- <v-btn @click="print"></v-btn> -->
        <v-select
            density="compact"
            
            v-model="chosenPlaylist"
            label="Select"
            :items="playlists.items"
            item-title="name"
            return-object
            @update:model-value="$emit('select-update',chosenPlaylist)"
            single-line
            placeholder="Choose a Playlist"
            persistent-placeholder=""
            
></v-select>


    
</template>