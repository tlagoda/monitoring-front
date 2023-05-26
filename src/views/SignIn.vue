<template>
  <h1>Sign in! 🔥</h1>
  <form @submit.prevent="signIn">
    <div class="input-section">
      <InputText type="text" v-model="formData.email" placeholder="Email" />
      <small class="error-msg" v-if="v$.email.$errors.length">{{
        v$.email.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <span class="p-input-icon-right">
        <InputText
          :type="showPassword ? 'text' : 'password'"
          v-model="formData.password"
          placeholder="Password"
        />
        <i
          v-if="formData.password"
          :class="{ pi: true, 'pi-eye': !showPassword, 'pi-eye-slash': showPassword }"
          @click="togglePassword"
        />
      </span>
      <small class="error-msg" v-if="v$.password.$errors.length">{{
        v$.password.$errors[0].$message
      }}</small>
    </div>
    <Button label="Submit" type="submit" />
  </form>
  <div class="signin-link">
    <p>
      Don't have an account yet?
      <router-link to="/signup" style="color: inherit">Register now</router-link>
    </p>
  </div>
</template>

<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { AuthService } from '@/services/auth.service.'
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, helpers } from '@vuelidate/validators'

const router = useRouter()
const signInError = ref('')

const formData = reactive({
  email: '',
  password: ''
})

// Form validations

const rules = computed(() => {
  return {
    email: {
      required: helpers.withMessage('Please enter your email.', required),
      email: helpers.withMessage(
        "This doesn't look like a valid email. Please check and try again.",
        email
      )
    },
    password: {
      required: helpers.withMessage('Please enter your password.', required),
      minLength: helpers.withMessage('Your password should be at least 6 characters.', minLength(6))
    }
  }
})

const v$ = useVuelidate(rules, formData)

// Handle password toggle
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Submit

const signIn = async () => {
  const result = await v$.value.$validate()
  if (!result) {
    formData.password = ''
    return
  }

  try {
    const response = await AuthService.login({
      email: formData.email,
      password: formData.password
    })
    if (response.statusCode === 200) {
      router.push('/')
    } else {
      signInError.value = response.message
      formData.password = ''
    }
  } catch (error: any) {
    signInError.value = error.message
    formData.password = ''
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

  .input-section {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    :deep(.p-inputtext) {
      width: 15rem;
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
        top: 70%;
        transform: translateY(-50%);
        font-size: 1.3rem;
        cursor: pointer;
      }
    }

    small {
      max-width: 15rem;
      margin-top: 0.5rem;
      color: #dc143c;
    }
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
