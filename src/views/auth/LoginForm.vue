<script setup lang="ts">
import type { LoginPayload } from '@/models/auth/auth-model'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useToast } from '@/composables/notify/toastify'
import { useCreateForm } from '@/composables/forms/create-form'

const router = useRouter()

const authStore = useAuthStore()

const { notify } = useToast()

const { formData: authFormData, formIsLoading: authFormIsLoading, handleSubmit: authFormHandleSubmit } = useCreateForm<LoginPayload>({
  initialFormData: {
    email: '',
    password: '',
  },
  submitFunction: async () => {
    const { statusCode } = await authStore.login(authFormData.value)

    if (statusCode.value === 201) {
      notify.success('Autenticação concluída.')

      router.push({
        name: 'home',
      })

      return
    }

    notify.error('Erro de autenticação!')
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
    <Form
      v-model:form="authFormData"
      :classes="{
        form: 'w-full flex flex-col items-center justify-center gap-4',
      }"
      :disabled="authFormIsLoading"
      @submit="authFormHandleSubmit"
    >
      <Input
        :classes="{
          outer: 'w-full',
          label: 'font-bold',
          input: 'w-full bg-base-100 rounded-sm mt-2 p-1',
        }"
        name="email"
        type="email"
        label="E-mail:"
      />

      <Input
        :classes="{
          outer: 'w-full',
          label: 'font-bold',
          input: 'w-full bg-base-100 rounded-sm mt-2 p-1',
        }"
        name="password"
        type="password"
        label="Senha:"
      />

      <ActionButton
        :classes="{
          outer: 'w-full bg-success/50 rounded-md hover:bg-success',
          input:
            'w-full flex items-center justify-center gap-2 text-success-content p-2 cursor-pointer',
        }"
        :label="{
          text: authFormIsLoading ? 'Carregando' : 'Entrar',
        }"
        :icon="{
          name: authFormIsLoading ? 'lucide:loader-circle' : 'lucide:log-in',
          class: [{ 'animate-spin': authFormIsLoading }],
        }"
        type="submit"
      />
    </Form>
  </div>
</template>
