<script setup lang="ts">
import type { LoginPayload } from '@/models/auth/auth-model'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useToast } from '@/composables/notify/toastify'
import { useCreateGeneralForm } from '@/composables/forms/create-general-form'

const router = useRouter()

const authStore = useAuthStore()

const { notify } = useToast()

const { formData, formIsLoading, handleSubmit } = useCreateGeneralForm<LoginPayload>({
  initialFormData: {
    email: '',
    password: '',
  },
  submitFunction: async () => {
    const { statusCode } = await authStore.login(formData.value)

    if (statusCode.value !== 201) {
      notify.error('Erro de autenticação!')

      return
    }

    notify.success('Autenticação concluída.')

    router.push({
      name: 'home',
    })
  },
})

onMounted(() => {
  if (router.currentRoute.value.query.authError === 'invalid') {
    notify.error('Autenticação inválida.')
  }
})
</script>

<template>
  <div class="w-96 bg-base-300 rounded-lg p-4">
    <GeneralForm
      v-model:form="formData"
      :classes="{
        form: 'w-full flex flex-col items-center justify-center gap-4',
      }"
      :disabled="formIsLoading"
      @submit="handleSubmit"
    >
      <GeneralInput
        :classes="{
          outer: 'w-full',
          label: 'font-bold',
          input: 'w-full bg-base-100 rounded-sm mt-2 p-1',
        }"
        type="email"
        name="email"
        label="E-mail:"
      />

      <GeneralInput
        :classes="{
          outer: 'w-full',
          label: 'font-bold',
          input: 'w-full bg-base-100 rounded-sm mt-2 p-1',
        }"
        type="password"
        name="password"
        label="Senha:"
      />

      <ActionButton
        :classes="{
          outer: 'w-full bg-success/50 rounded-md hover:bg-success',
          input:
            'w-full flex items-center justify-center gap-2 text-success-content p-2 cursor-pointer',
        }"
        :label="{
          text: formIsLoading ? 'Carregando' : 'Entrar',
        }"
        :icon="{
          name: formIsLoading ? 'lucide:loader-circle' : 'lucide:log-in',
          class: [{ 'animate-spin': formIsLoading }],
        }"
        type="submit"
      />
    </GeneralForm>
  </div>
</template>
