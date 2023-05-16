<template>
  <v-app-bar app color="primary">
    <v-row align="center" no-gutters>
      <v-col cols="auto">
        <v-img :src="logo" alt="Logo" width="40px" class="mr-2" />
      </v-col>
      <v-col cols="auto">
        <span class="text-secondary">Power Monitor</span>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-app-bar>
</template>

<script lang="ts" setup>
import logo from '@/assets/dumbbell.png'
</script>

<style scoped>
.v-app-bar {
  padding: 0 15px;
}

.mb-1 {
  margin-bottom: 0.5rem;
}
.mt-0 {
  margin-top: 0;
}

.router-link {
  text-decoration: none;
}
</style>
