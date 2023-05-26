<template>
  <h1>Create your account! 🚀</h1>
  <form @submit.prevent="signUp">
    <div class="input-section">
      <InputText type="text" v-model="formData.username" placeholder="Username" v-on:blur="v$.username.$touch()"/>
      <small v-if="v$.username.$errors.length">{{ v$.username.$errors[0].$message }}</small>
    </div>
    <div class="input-section">
      <InputText type="text" v-model="formData.email" placeholder="Email" v-on:blur="v$.email.$touch()"/>
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
          aria-describedby="password"
          v-on:blur="v$.password.$touch()"
        />
        <i
          v-if="formData.password"
          :class="{ pi: true, 'pi-eye': !showPassword, 'pi-eye-slash': showPassword }"
          @click="togglePassword"
        />
      </span>
      <small class="p-invalid" v-if="v$.password.$errors.length">{{
        v$.password.$errors[0].$message
      }}</small>
    </div>
    <div class="input-section">
      <span class="p-input-icon-right">
        <InputText
          :type="showPasswordConfirm ? 'text' : 'password'"
          placeholder="Confirm Password"
          v-model="formData.confirmPassword"
          aria-describedby="confirmPassword"
          v-on:blur="v$.confirmPassword.$touch()"
        />
        <i
          v-if="formData.confirmPassword"
          :class="{ pi: true, 'pi-eye': !showPasswordConfirm, 'pi-eye-slash': showPasswordConfirm }"
          @click="togglePasswordConfirm"
        />  
      </span>
      <small v-if="v$.confirmPassword.$errors.length">{{
        v$.confirmPassword.$errors[0].$message
      }}</small>
    </div>

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
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength, sameAs, helpers } from '@vuelidate/validators'

const router = useRouter()

const formData = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Form validations
const rules = computed(() => {
  return {
    username: {
      required: helpers.withMessage('Username is required.', required),
      minLength: helpers.withMessage('Username should be at least 6 characters.', minLength(6))
    },
    email: {
      required: helpers.withMessage('Email is required.', required),
      email: helpers.withMessage(
        "This doesn't look like a valid email. Please check and try again.",
        email
      )
    },
    password: {
      required: helpers.withMessage('Password is required.', required),
      minLength: helpers.withMessage('Password should be at least 6 characters.', minLength(6))
    },
    confirmPassword: {
      required: helpers.withMessage('Please confirm your password.', required),
      sameAs: helpers.withMessage('Passwords do not match.', sameAs(formData.password))
    }
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
  if (!result) {
    return
  }

  try {
    const response = await AuthService.signup({
      username: formData.username,
      email: formData.email,
      password: formData.confirmPassword
    })
    if (response.statusCode === 201) {
      router.push('/')
    } else {
      alert('An error occured.')
    }
  } catch (err: any) {
    alert('An error occured: ' + err.message)
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
      width: 15rem;
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
