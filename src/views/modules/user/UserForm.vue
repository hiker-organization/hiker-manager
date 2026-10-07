<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useRoute } from 'vue-router'
import { useCreateForm } from '@/composables/forms/create-form'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'

const userStore = useUserStore()

const route = useRoute()

const user = computed<string | undefined>(() => {
  if (!route.params.user) {
    return undefined
  }

  return String(route.params.user)
})

const { formData } = useCreateForm<User>({
  initialFormData: {
    nome_usuario: '',
    nome_exibicao: '',
    email: '',
    data_nascimento: '',
    numero_celular: '',
    foto_url: null,
    reputacao: 0,
    cargo: 'USER',
    bloqueado: false,
  },
})

const normalizedBithDate = computed<string>({
  get: () => formData.value.data_nascimento.slice(0, 10),
  set: (value: string) => {
    formData.value.data_nascimento = value
  },
})

onMounted(async () => {
  if (!user.value) {
    return
  }

  const { data } = await userStore.getUser(
    {},
    {
      user: user.value,
    },
  )

  if (data.value) {
    formData.value = data.value.data
  }
})
</script>

<template>
  <Form
    v-model:form="formData"
    :disabled="true"
    :classes="{
      form: 'w-full flex items-start justify-stretch gap-4',
    }"
  >
    <FieldsContainer>
      <FormSection label="Dados Básicos" icon="lucide:info">
        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="nome_usuario"
          type="text"
          label="Usuário:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="nome_exibicao"
          type="text"
          label="Nome:"
        />

        <Input
          :options="[
            { label: 'Usuário', value: 'USER' },
            { label: 'Administrador', value: 'ADM' },
          ]"
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="cargo"
          type="select"
          label="Cargo:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="email"
          type="email"
          label="E-mail:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="numero_celular"
          type="text"
          label="Celular:"
        />

        <Input
          v-model="normalizedBithDate"
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="data_nascimento"
          type="date"
          label="Data de Nascimento:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="reputacao"
          type="number"
          label="Reputação:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="foto_url"
          type="text"
          label="Foto (URL):"
        />
      </FormSection>
    </FieldsContainer>

    <ToggleFieldsContainer>
      <Toggle v-model:is-checked="formData.bloqueado" :disabled="true" label="Bloqueado" />
    </ToggleFieldsContainer>
  </Form>
</template>
