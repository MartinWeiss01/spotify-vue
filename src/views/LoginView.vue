<script setup lang="ts">
import AppHero from "@/components/login/AppHero.vue";
import LoginWithSpotify from "@/components/login/LoginWithSpotify.vue";
import Config from "@/config";
</script>

 

<template>
<div class="d-flex justify-center h-100 align-center pa-4">
<div class="my-12">
<AppHero />
<LoginWithSpotify />
<span>{{ Config.appUrl }}</span>
</div>
</div>
</template>