<template>
  <h1>Create your account! 🚀</h1>
  <form @submit.prevent="signUp">
    <InputText
      type="text"
      class="custom-input"
      v-model="formData.username"
      placeholder="Username"
    />
    <small v-if="v$.username.$errors.length">{{ v$.username.$errors[0].$message }}</small>
    <InputText type="text" v-model="formData.email" placeholder="Email" />
    <span class="p-input-icon-right">
      <InputText
        :type="showPassword ? 'text' : 'password'"
        v-model="formData.password"
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
        v-model="formData.confirmPassword"
        aria-describedby="confirmPassword"
      />
      <i
        :class="{ pi: true, 'pi-eye': !showPasswordConfirm, 'pi-eye-slash': showPasswordConfirm }"
        @click="togglePasswordConfirm"
      />
    </span>
    <span v-for="error in v$.$errors" :key="error.$uid">
      {{ error.$property }}: {{ error.$message }}
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
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'

const router = useRouter()

// User data

const newUser: NewUser = reactive({
  username: '',
  email: '',
  password: ''
})

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Form validations
const rules = computed(() => {
  return {
    username: { required },
    email: { required, email },
    password: { required },
    confirmPassword: { required }
  }
})

const v$ = useVuelidate(rules, formData)

// Handle password toggle
const confirmPassword = ref('')

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
  const result = await v$.value.$validate()
  alert(result)
  // console.log('HELLO')
  // try {
  //   const response = await AuthService.signup(newUser)
  //   if (response.statusCode === 201) {
  //     router.push('/')
  //   } else {
  //     // signUpError.value = "Canno't sign up."
  //   }
  // } catch (err: any) {
  //   // signUpError.value = err.message
  // }
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
