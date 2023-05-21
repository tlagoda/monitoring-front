<template>
  <h1>Create your account! 🚀</h1>
  <form @submit:prevent="signUp">
    <InputText type="text" class="custom-input" v-model="newUser.username" placeholder="Username" />
    <InputText type="text" v-model="newUser.email" placeholder="Email" />
    <InputText type="text" v-model="newUser.password" placeholder="Password" />
    <InputText type="text" placeholder="Confirm Password" />
    <Dropdown
      v-model="newUser.sexe"
      :options="allowedSexes"
      optionLabel="name"
      placeholder="Sexe"
      class="w-full md:w-14rem"
    />
    <Button label="Submit" type="submit" />
  </form>

  <div class="signin-link">
    Already have an account? <router-link to="/signin" style="color: inherit">Sign in</router-link>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { AuthService } from '@/services/auth.service.'
import type { NewUser } from '@/types/auth/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const allowedSexes = [{ name: 'Male' }, { name: 'Female' }, { name: 'None' }]

const newUser: NewUser = reactive({
  username: '',
  email: '',
  password: '',
  sexe: 'unknown'
})
const signUpError = ref('')

const rules = {
  required: (value: string) => !!value || 'Required.',
  passwordMatch: (value: string) => value === newUser.password || "Passwords don't match."
}
const signUp = async () => {
  try {
    const response = await AuthService.signup(newUser)
    if (response.statusCode === 201) {
      router.push('/')
    } else {
      signUpError.value = "Canno't sign up."
    }
  } catch (err: any) {
    signUpError.value = err.message
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin: 3vh auto 5vh auto;
}
form {
  width: 30vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  :deep(.p-inputtext) {
    width: 15rem;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }

  :deep(.p-button) {
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
  }
}

.signin-link {
  margin: 20px auto 0 auto;
}
</style>
