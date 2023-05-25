<template>
  <h1>Create your account! 🚀</h1>
  <form @submit.prevent="signUp">
    <InputText type="text" class="custom-input" v-model="newUser.username" placeholder="Username" />
    <InputText type="text" v-model="newUser.email" placeholder="Email" />
    <span class="p-input-icon-right">
      <InputText
        :type="showPassword ? 'text' : 'password'"
        v-model="newUser.password"
        placeholder="Password"
        aria-describedby="password"
      />
      <i
        :class="{ pi: true, 'pi-eye': !showPassword, 'pi-eye-slash': showPassword }"
        @click="togglePassword"
      />
    </span>
    <span class="p-input-icon-right">
      <InputText
        :type="showPasswordConfirm ? 'text' : 'password'"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        aria-describedby="confirmPassword"
      />
      <i
        :class="{ pi: true, 'pi-eye': !showPasswordConfirm, 'pi-eye-slash': showPasswordConfirm }"
        @click="togglePasswordConfirm"
      />
    </span>
    <Button label="Submit" type="submit" />
  </form>

  <div class="signin-link">
    <p>
      Already have an account?
      <router-link to="/signin" style="color: inherit">Sign in</router-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { AuthService } from '@/services/auth.service.'
import type { NewUser } from '@/types/auth/types'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField } from 'vee-validate'
import * as Yup from 'yup'

const router = useRouter()

// User data

const newUser: NewUser = reactive({
  username: '',
  email: '',
  password: '',
})
const confirmPassword = ref('')

// Handle password toggle

const showPassword = ref(false)
const showPasswordConfirm = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const togglePasswordConfirm = () => {
  showPasswordConfirm.value = !showPasswordConfirm.value
}

// Form validations

// Submit

const signUp = async () => {
  console.log('HELLO')
  try {
    const response = await AuthService.signup(newUser)
    if (response.statusCode === 201) {
      router.push('/')
    } else {
      // signUpError.value = "Canno't sign up."
    }
  } catch (err: any) {
    // signUpError.value = err.message
  }
}
</script>

<style scoped lang="scss">
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
    padding: 0.5rem 2rem 0.5rem 1rem;
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

  :deep(.p-dropdown) {
    width: 15rem;
    font-size: 1.3rem;
    margin-bottom: 1rem;
    border-radius: 1rem;
  }

  :deep(.p-button) {
    font-size: 1.5rem;
    padding: 0.5rem 1.5rem;
    margin: 1rem 0;
    border-radius: 1rem;
  }
}

.signin-link {
  width: 100vw;

  p {
    text-align: center;
  }
}
</style>
