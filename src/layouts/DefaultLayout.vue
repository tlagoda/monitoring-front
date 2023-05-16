<template>
    <div>
      <my-header></my-header>
      <router-view/>
    </div>
  </template>
  
  <script lang="ts" setup>
  import MyHeader from '@/components/MyHeader.vue';
  </script>
  
  <style scoped></style>