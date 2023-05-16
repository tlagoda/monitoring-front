<template>
  <v-app><router-view></router-view></v-app>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const title = ref('My App')
</script>
