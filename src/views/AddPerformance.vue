<template>
  <h1>Add a performance! 💪</h1>
  <Card>
    <template #content>
      <div class="content">
        <form @submit.prevent="addPerformance">
          <div class="field-section">
            <label for="">Date</label>
            <div class="input-section">
              <Calendar v-model="formData.date" v-on:blur="v$.date.$touch()" />
              <small class="error-msg" v-if="v$.date.$errors.length">{{
                v$.date.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Exercise</label>
            <div class="input-section">
              <InputText
                v-model="formData.exercise"
                placeholder="Biceps Curl"
                v-on:blur="v$.exercise.$touch()"
              />
              <small class="error-msg" v-if="v$.exercise.$errors.length">{{
                v$.exercise.$errors[0].$message
              }}</small>
            </div>
          </div>

          <div class="field-section">
            <label for="">Muscles</label>
            <div class="input-section">
              <MultiSelect
                display="chip"
                :options="allowedMuscles"
                v-model="formData.muscles"
                placeholder="Biceps"
                v-on:blur="v$.muscles.$touch()"
              />
              <small class="error-msg" v-if="v$.muscles.$errors.length">{{
                v$.muscles.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Sets</label>
            <div class="input-section">
              <InputNumber
                v-model="formData.sets"
                suffix=" sets"
                :min="1"
                :max="100"
                v-on:blur="v$.sets.$touch()"
              />
              <small class="error-msg" v-if="v$.sets.$errors.length">{{
                v$.sets.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Repetitions</label>
            <div class="input-section">
              <InputNumber
                v-model="formData.repetitions"
                suffix=" reps"
                :min="1"
                :max="100"
                v-on:blur="v$.repetitions.$touch()"
              />
              <small class="error-msg" v-if="v$.repetitions.$errors.length">{{
                v$.repetitions.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Rest time</label>
            <div class="input-section">
              <InputNumber
                suffix=" s"
                v-model="formData.restTime"
                :min="0"
                :max="3600"
                v-on:blur="v$.restTime.$touch()"
              />
              <small class="error-msg" v-if="v$.restTime.$errors.length">{{
                v$.restTime.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Weight</label>
            <div class="input-section">
              <InputNumber
                suffix=" lbs"
                v-model="formData.weight"
                :min="1"
                :max="300"
                v-on:blur="v$.weight.$touch()"
              />
              <small class="error-msg" v-if="v$.weight.$errors.length">{{
                v$.weight.$errors[0].$message
              }}</small>
            </div>
          </div>
          <div class="field-section">
            <label for="">Comment</label>
            <div class="input-section">
              <Textarea
                placeholder="What an amazing session!"
                v-model="formData.comment"
                v-on:blur="v$.comment.$touch()"
              />
              <small class="error-msg" v-if="v$.comment.$errors.length">{{
                v$.comment.$errors[0].$message
              }}</small>
            </div>
          </div>
          <Button label="Add" type="submit" />
        </form>
      </div>
    </template>
  </Card>
  <Toast position="bottom-right" />
</template>

<script lang="ts" setup>
import Card from 'primevue/card'
import Calendar from 'primevue/calendar'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import MultiSelect from 'primevue/multiselect'
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { reactive, ref, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers, maxLength, maxValue, minValue } from '@vuelidate/validators'
import { PerformanceService } from '@/services/performances.service'

const today = ref('')

const todayDate = new Date()
const dd = String(todayDate.getDate()).padStart(2, '0')
const mm = String(todayDate.getMonth() + 1).padStart(2, '0')
const yyyy = todayDate.getFullYear()

today.value = mm + '/' + dd + '/' + yyyy

const allowedMuscles = ref(['Biceps', 'Triceps'])

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
const toast = useToast()

const addPerformance = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    return
  }

  try {
    const response = await PerformanceService.createPerformance({
      ...formData,
      userInternalId: 'bda30706-0f68-46d5-b542-1d944c755a4c'
    })
    if (response.statusCode === 201) {
      toast.add({
        severity: 'success',
        summary: 'Done 💪 ',
        detail: 'Performance added to your history!',
        life: 5000
      })
    } else {
      throw new Error('Unable to create performance.')
    }
  } catch (err: any) {
    alert('An error occured: ' + err.message)
  }
}
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
    .field-section {
      width: 80%;
      margin: 0.5rem auto;
      display: flex;
      justify-content: space-between;
      align-items: center;

      label {
        font-size: 1.3rem;
      }

      .input-section {
        display: flex;
        flex-direction: column;

        & > :first-child {
          width: 15rem;
        }

        small {
          color: #dc143c;
        }
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
