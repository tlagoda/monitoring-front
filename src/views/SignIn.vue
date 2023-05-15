<template>
  <h1>Sign in! 🔥</h1>
  <v-form ref="form" @submit.prevent="signIn">
    <v-text-field label="Email" required :rules="[rules.required]" v-model="email"></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      required
      :rules="[rules.required]"
      v-model="password"
    ></v-text-field>
    <p v-if="signInError" class="error-message">{{ signInError }}</p>
    <v-btn type="submit" color="red">Sign in</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service.'
import { ref } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
let signInError = ref('')

const rules = {
  required: (value: string) => !!value || 'Required.'
}

const signIn = async () => {
  try {
    const response = await AuthService.login({
      email: email.value,
      password: password.value
    })
    if (response.statusCode === 200) {
      router.push('/')
    } else {
      signInError.value = response.message
      email.value = ''
      password.value = ''
    }
  } catch (error: any) {
    signInError.value = error.message
    email.value = ''
    password.value = ''
  }
}
</script>

<style scoped>
h1 {
  margin: 3vh auto 5vh auto;
}
.v-form {
  width: 20vw;
  margin: 0 auto;
}

.v-btn {
  width: 45%;
}

.error-message {
  color: red;
}
</style>
