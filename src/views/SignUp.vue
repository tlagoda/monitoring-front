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
    <div class="d-flex align-center justify-center">
      <v-btn type="submit" color="red">Sign up</v-btn>
    </div>
  </v-form>
  <div class="signin-link">
    Already have an account? <router-link to="/signin">Sign in</router-link>
  </div>
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

.signin-link {
  margin: 20px auto 0 auto;
}
</style>
