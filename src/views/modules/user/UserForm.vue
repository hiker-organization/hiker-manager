<script setup lang="ts">
import { useUserForm } from '@/composables/modules/user/use-user-form'

const { userFormData, normalizedBirthDate, normalizedBlockExpirationDate } = useUserForm()
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
