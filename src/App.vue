<template>
  <v-app>
    <v-main>
      <h1>{{ title }}</h1>
      <v-btn>Add performance</v-btn>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('My App')
</script>
