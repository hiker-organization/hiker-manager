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

const { formData: userFormData } = useCreateForm<User>({
  initialFormData: {
    id: 0,
    cargo: 'USER',
    nome_usuario: '',
    nome_exibicao: '',
    email: '',
    data_nascimento: null,
    numero_celular: '',
    reputacao: 0,
    foto_url: null,
    banido: false,
    bloqueado: false,
    bloqueado_ate: null,
  },
})

const normalizedBirthDate = computed<string>({
  get: () => {
    if (!userFormData.value.data_nascimento) {
      return ''
    }

    return userFormData.value.data_nascimento.slice(0, 10)
  },
  set: (value: string) => {
    console.log(value)

    userFormData.value.data_nascimento = value
  },
})

const normalizedBlockExpirationDate = computed<string>({
  get: () => {
    if (!userFormData.value.bloqueado_ate) {
      return ''
    }

    return userFormData.value.bloqueado_ate.slice(0, 10)
  },
  set: (value: string) => {
    console.log(value)

    userFormData.value.bloqueado_ate = value
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
    userFormData.value = data.value.data
  }
})
</script>

<template>
  <Form
    v-model:form="userFormData"
    :disabled="true"
    :classes="{
      form: 'w-full flex flex-col items-start justify-stretch gap-4 lg:flex-row',
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
          name="id"
          type="hidden"
          label="ID:"
        />

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
          v-model="normalizedBirthDate"
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

        <Input
          v-show="userFormData.bloqueado_ate && userFormData.bloqueado_ate !== ''"
          v-model="normalizedBlockExpirationDate"
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="bloqueado_ate"
          type="date"
          label="Expiração do Bloqueio:"
        />
      </FormSection>
    </FieldsContainer>

    <ToggleFieldsContainer>
      <Toggle v-model:is-checked="userFormData.banido" :disabled="true" label="Banido" />

      <Toggle v-model:is-checked="userFormData.bloqueado" :disabled="true" label="Bloqueado" />
    </ToggleFieldsContainer>
  </Form>
</template>
