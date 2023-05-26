<template>
  <h1>Add a performance! 💪</h1>
  <Card>
    <template #content>
      <div class="content">
        <div class="input-section">
          <label for="">Exercise</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Muscles</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Date</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Sets</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Repetitions</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">RestTime</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Weight</label>
          <InputText />
        </div>
        <div class="input-section">
          <label for="">Comment</label>
          <InputText />
        </div>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin: 2rem 0;
}
.p-card {
  width: 40vw;
  margin: 0 auto;
  height: 80vh;
  border-radius: 2rem;
  border: 1px solid white;

  .content {
    display: flex;
    flex-direction: column;
  }
}
</style>
