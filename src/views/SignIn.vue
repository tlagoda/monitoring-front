<template>
  <h1>Sign in! 🔥</h1>
  <form @submit:prevent="signIn">
    <InputText type="text" v-model="email" placeholder="Email" />
    <span class="p-input-icon-right">
      <InputText
        :type="showPassword ? 'text' : 'password'"
        v-model="password"
        placeholder="Password"
      />
      <i
        :class="{ pi: true, 'pi-eye': !showPassword, 'pi-eye-slash': showPassword }"
        @click="togglePassword"
      />
    </span>
    <Button label="Submit" type="submit" />
  </form>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service.'
import { ref } from 'vue'

const router = useRouter()
const email = ref('')
const password = ref('')
const signInError = ref('')
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
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
      password.value = ''
    }
  } catch (error: any) {
    signInError.value = error.message
    password.value = ''
  }
}
</script>

<style scoped lang="scss">
h1 {
  margin: 3vh auto 5vh auto;
}

h1 {
  text-align: center;
  margin: 2rem 0;
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
    padding: 0.5rem 1rem;
    font-size: 1.3rem;
    border-radius: 1rem;
  }

  .p-input-icon-right {
    display: flex;
    align-items: center;
    position: relative;

    .pi {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      font-size: 1.3rem;
      cursor: pointer;
    }
  }

  :deep(.p-button) {
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    margin: 1rem 0;
    border-radius: 1rem;
  }
}

.signup-link {
  margin: 20px auto 0 auto;
}
</style>
