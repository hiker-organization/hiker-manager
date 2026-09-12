<script setup lang="ts">
import type { LoginPayload } from '@/models/auth/auth-model'
import { ref } from 'vue'

const authForm = ref<LoginPayload>({
  email: '',
  senha: '',
})

async function handleSubmit() {
  //
}
</script>

<template>
  <div class="w-96 bg-base-300 rounded-lg p-4">
    <GeneralForm
      v-model:form="authForm"
      :classes="{
        form: 'w-full flex flex-col items-center justify-center gap-4'
      }"
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
        name="senha"
        label="Senha:"
      />

      <ActionButton
        :classes="{
          outer: 'w-full bg-success/50 rounded-md hover:bg-success',
          input: 'w-full flex items-center justify-center gap-2 text-success-content p-2 cursor-pointer',
        }"
        type="submit"
        text="Entrar"
        icon="lucide:log-in"
      />
    </GeneralForm>
  </div>
</template>
