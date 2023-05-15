<template>
  <h1>Create your account! 🚀</h1>
  <v-form ref="form" @submit.prevent="signUp">
    <v-text-field
      label="Email *"
      required
      :rules="[rules.required]"
      v-model="newUser.email"
    ></v-text-field>
    <v-text-field
      label="Username *"
      required
      :rules="[rules.required]"
      v-model="newUser.username"
    ></v-text-field>
    <v-text-field
      label="Password *"
      type="password"
      required
      :rules="[rules.required]"
      v-model="newUser.password"
    ></v-text-field>
    <v-text-field
      label="Confirm Password *"
      type="password"
      required
      :rules="[rules.required]"
    ></v-text-field>
    <p v-if="signUpError" class="error-message">{{ signUpError }}</p>
    <v-btn type="submit" color="red">Sign up</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { AuthService } from '@/services/auth.service.'
import type { NewUser } from '@/types/auth/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const newUser: NewUser = reactive({
  username: '',
  email: '',
  password: '',
  sexe: 'M'
})
const signUpError = ref('')

const rules = {
  required: (value: string) => !!value || 'Required.'
}
const signUp = async () => {
  try {
    const response = await AuthService.signup(newUser)
    
  } catch (err: any) {
    signUpError.value = err.message
  }
}
</script>

<style scoped>
h1 {
  margin: 3vh auto 5vh auto;
}
.v-form {
  width: 30vw;
  margin: 0 auto;
}

.v-btn {
  width: 45%;
}

.error-message {
  color: red;
}
</style>
