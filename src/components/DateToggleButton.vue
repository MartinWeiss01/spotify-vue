<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import {ref} from "vue"




const props = defineProps<{
  time_ranges:{value:string,label:string}[]
  
}>()
const emit = defineEmits({
  getTimeRangeIndex: (timeRangeIndex: number) => true
})

function getTimeRangeIndex(timeRangeIndexIndex:number){
  
  
 
  emit('getTimeRangeIndex',timeRangeIndexIndex)
}
var toggle= ref(0)
</script>
<template>
  

    <v-row justify="center">
      <v-btn-toggle
        v-model = "toggle"
        
        mandatory
        
      >
        <v-btn v-for="time_range in time_ranges" @click="getTimeRangeIndex(toggle)">
          {{time_range.label}}
        </v-btn>

        <!-- is kinda broken i have no idea how to fix it -->

        
      </v-btn-toggle>
    </v-row>
  
</template>