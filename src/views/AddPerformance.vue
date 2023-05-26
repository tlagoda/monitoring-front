<template>
  <h1>Add a performance! 💪</h1>
  <Card class="uu">
    <template #content>
      <InputText />
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
</script>

<style scoped>
.uu {
  width: 40vw;
  margin: 0 auto;
  height: 80vh;
  border-radius: 2rem;
}
</style>
