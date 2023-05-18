<template>
  <div class="d-flex justify-space-between align-center">
    <div class="d-flex overflow-hidden w-100">
      <v-skeleton-loader
        class="bg-grey-darken-4 d-flex"
        type="avatar"
      ></v-skeleton-loader>

      <v-skeleton-loader
        class="ml-4 bg-grey-darken-4 d-flex"
        width="280"
        type="list-item-two-line"
      />
    </div>

    <div class="d-none d-sm-flex">
      <v-skeleton-loader
        class="bg-grey-darken-4 d-flex"
        width="150"
        type="text"
      />
    </div>
  </div>
</template>
