<template>
  <h1>Add a performance! 💪</h1>
  <Card>
    <template #content>
      <div class="content">
        <form @submit.prevent="addPerformance">
          <div class="input-section">
            <label for="">Date</label>
            <Calendar v-model="formData.date" />
          </div>
          <div class="input-section">
            <label for="">Exercise</label>
            <InputText v-model="formData.exercise" placeholder="Biceps Curl"/>
          </div>
          <div class="input-section">
            <label for="">Muscles</label>
            <MultiSelect display="chip" :options="muscles" v-model="formData.muscles" placeholder="Biceps"/>
          </div>
          <div class="input-section">
            <label for="">Sets</label>
            <InputNumber v-model="formData.sets" suffix=" sets"/>
          </div>
          <div class="input-section">
            <label for="">Repetitions</label>
            <InputNumber v-model="formData.repetitions" suffix=" reps" />
          </div>
          <div class="input-section">
            <label for="">Rest time</label>
            <InputNumber suffix=" s" v-model="formData.restTime" />
          </div>
          <div class="input-section">
            <label for="">Weight</label>
            <InputNumber suffix=" lbs" v-model="formData.weight" />
          </div>
          <div class="input-section">
            <label for="">Comment</label>
            <Textarea placeholder="What an amazing session!" v-model="formData.comment" />
          </div>
          <Button label="Add" type="submit" />
        </form>
      </div>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from 'primevue/card'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import { reactive, ref } from 'vue'

const today = ref('')

const todayDate = new Date()
const dd = String(todayDate.getDate()).padStart(2, '0')
const mm = String(todayDate.getMonth() + 1).padStart(2, '0')
const yyyy = todayDate.getFullYear()

today.value = mm + '/' + dd + '/' + yyyy

const muscles = ref(['Biceps', 'Triceps'])

const formData = reactive({
  date: today,
  exercise: '',
  muscles: [],
  sets: 5,
  repetitions: 10,
  restTime: 60,
  weight: 40,
  comment: ''
})

const addPerformance = () => {}
</script>

<style scoped lang="scss">
h1 {
  text-align: center;
  margin: 2rem 0;
}
.p-card {
  width: 40vw;
  min-width: 30rem;
  margin: 0 auto;
  height: 80vh;
  border-radius: 2rem;
  border: 1px solid white;

  .content {
    form {
      display: flex;
      flex-direction: column;
    }
    .input-section {
      width: 80%;
      margin: 0.5rem auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        font-size: 1.3rem;
      }

      & > :last-child {
        width: 15rem;
      }
    }

    :deep(.p-button) {
      font-size: 1.3rem;
      padding: 0.5rem 1.5rem;
      margin: 1rem auto;
      border-radius: 1rem;
    }
  }
}
</style>
