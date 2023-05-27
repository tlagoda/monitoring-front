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
            <InputText v-model="formData.exercise" placeholder="Biceps Curl" />
          </div>
          <div class="input-section">
            <label for="">Muscles</label>
            <MultiSelect
              display="chip"
              :options="allowedMuscles.concat(uu)"
              v-model="formData.muscles"
              placeholder="Biceps"
            />
          </div>
          <div class="input-section">
            <label for="">Sets</label>
            <InputNumber v-model="formData.sets" suffix=" sets" :min="1" :max="100" />
          </div>
          <div class="input-section">
            <label for="">Repetitions</label>
            <InputNumber v-model="formData.repetitions" suffix=" reps" :min="1" :max="100" />
          </div>
          <div class="input-section">
            <label for="">Rest time</label>
            <InputNumber suffix=" s" v-model="formData.restTime" :min="0" :max="3600" />
          </div>
          <div class="input-section">
            <label for="">Weight</label>
            <InputNumber suffix=" lbs" v-model="formData.weight" :min="1" :max="300" />
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
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength, maxValue, minValue } from '@vuelidate/validators'

const today = ref('')

const todayDate = new Date()
const dd = String(todayDate.getDate()).padStart(2, '0')
const mm = String(todayDate.getMonth() + 1).padStart(2, '0')
const yyyy = todayDate.getFullYear()

today.value = mm + '/' + dd + '/' + yyyy

const allowedMuscles = ref(['Biceps', 'Triceps'])
const uu = ['aa']
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

// Form Validations

const rules = computed(() => {
  return {
    date: { required: helpers.withMessage('Enter a date.', required) },
    exercise: {
      required: helpers.withMessage('Enter an exercise.', required),
      maxLength: helpers.withMessage('Max 100 characters.', maxLength(100))
    },
    muscles: {
      musclesAreValids: () => {
        return formData.muscles.every((muscle) => allowedMuscles.value.includes(muscle))
      }
    },
    sets: {
      required: helpers.withMessage('Sets are required.', required),
      minValue: helpers.withMessage('Sets cannot be less than 1.', minValue(1)),
      maxValue: helpers.withMessage('Sets cannot be more than 100.', maxValue(100))
    },
    repetitions: {
      required: helpers.withMessage('Repetitions are required.', required),
      minValue: helpers.withMessage('Repetitions cannot be less than 1.', minValue(1)),
      maxValue: helpers.withMessage('Repetitions cannot be more than 100.', maxValue(100))
    },
    restTime: {
      required: helpers.withMessage('Rest time is required.', required),
      minValue: helpers.withMessage('Rest time cannot be less than 0 seconds.', minValue(0)),
      maxValue: helpers.withMessage('Rest time cannot be more than 3600 seconds.', maxValue(3600))
    },
    weight: {
      required: helpers.withMessage('Weight is required.', required),
      minValue: helpers.withMessage('Weight cannot be less than 1 lb.', minValue(1)),
      maxValue: helpers.withMessage('Weight cannot be more than 300 lbs.', maxValue(300))
    },
    comment: {
      maxLength: helpers.withMessage('Max 200 characters.', maxLength(200))
    }
  }
})

const v$ = useVuelidate(rules, formData)

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
