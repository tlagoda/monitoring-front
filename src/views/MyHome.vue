<template>
  <div class="my-component">
    <h1>Your performances! 🔥</h1>
    <div class="perf-container">
      <v-card
        v-for="perf in performances"
        :key="perf.internalId"
        :title="perf.exercise"
        width="230px"
        append-icon="mdi-arm-flex"
        elevation="12"
        rounded="lg"
      >
        <v-card-content>
          <ul>
            <li>Sets: {{ perf.sets }}</li>
            <li>Repetitions: {{ perf.repetitions }}</li>
            <li>Weight: {{ perf.weight }} kgs</li>
            <li>Rest time: {{ perf.restTime }}s</li>
            <li>
              Muscles:
              <span v-for="muscle in perf.muscles" :key="muscle">{{ `${muscle} / ` }} </span>
            </li>
            <li>Total weight: {{ perf.totalWeight }} kgs</li>
          </ul>
        </v-card-content>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue'
import { PerformanceService } from '../services/performances.service'

const performances = ref(null)

onBeforeMount(async () => {
  const { data: userPerformances } = await PerformanceService.getAll()
  performances.value = userPerformances
})
</script>

<style scoped>
.my-component {
  margin: 60px 0;
}

h1 {
  margin: 70px auto 50px auto;
  text-align: center;
}

.perf-container {
  width: 90vw;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 40px;
}

.v-card {
  padding: 5px 25px;
}
</style>
