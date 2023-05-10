<template>
  <h1>Create your account! 🚀</h1>
  <v-form ref="form" @submit.prevent="signUp">
    <v-text-field label="Email *" required :rules="[rules.required]"></v-text-field>
    <v-text-field label="Username *" required :rules="[rules.required]"></v-text-field>
    <v-text-field
      label="Password *"
      type="password"
      required
      :rules="[rules.required]"
    ></v-text-field>
    <v-text-field
      label="Confirm Password *"
      type="password"
      required
      :rules="[rules.required]"
    ></v-text-field>
    <v-btn type="submit" color="red">Sign up</v-btn>
  </v-form>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const rules = {
  required: (value: string) => !!value || 'Required.'
}
const signUp = () => {
  console.log('User signed up.')
  router.push({ path: '/' })
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
</style>
