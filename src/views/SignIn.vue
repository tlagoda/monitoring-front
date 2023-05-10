<template>
  <h1>Sign in! 🔥</h1>
  <v-form ref="form" @submit.prevent="signIn">
    <v-text-field label="Username" required :rules="[rules.required]"></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      required
      :rules="[rules.required]"
    ></v-text-field>
    <v-btn type="submit" color="red">Sign in</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const rules = {
  required: (value: string) => !!value || 'Required.'
}

const signIn = () => {
  console.log('User signed in.')
  router.push({ path: '/' })
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
</style>
