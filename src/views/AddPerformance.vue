<template>
  <h1>Add a performance! 💪</h1>
  <Card>
    <template #content>
      <div class="content">
        <form @submit.prevent="addPerformance">
          <div class="input-section">
            <label for="">Date</label>
            <Calendar />
          </div>
          <div class="input-section">
            <label for="">Exercise</label>
            <InputText />
          </div>
          <div class="input-section">
            <label for="">Muscles</label>
            <MultiSelect />
          </div>
          <div class="input-section">
            <label for="">Sets</label>
            <InputNumber :inputStyle="{ width: '12rem'}"/>
          </div>
          <div class="input-section">
            <label for="">Repetitions</label>
            <InputNumber :inputStyle="{ width: '12rem'}"/>
          </div>
          <div class="input-section">
            <label for="">RestTime</label>
            <InputNumber :inputStyle="{ width: '12rem'}"/>
          </div>
          <div class="input-section">
            <label for="">Weight</label>
            <InputNumber :inputStyle="{ width: '12rem'}" suffix=" lbs" />
          </div>
          <div class="input-section">
            <label for="">Comment</label>
            <Textarea />
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
