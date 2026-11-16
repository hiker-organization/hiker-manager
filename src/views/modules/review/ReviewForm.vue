<script setup lang="ts">
import { useReviewForm } from '@/composables/modules/review/use-review-form'

const { reviewFormData } = useReviewForm()
</script>

<template>
  <Form
    v-model:form="reviewFormData"
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
          name="descricao"
          type="text"
          label="Descrição:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="local"
          type="text"
          label="Local:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="nota"
          type="number"
          label="Nota:"
        />
      </FormSection>

      <FormSection label="Estatísticas" icon="lucide:chart-no-axes-column">
        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="qnt_likes"
          type="number"
          label="Quantidade de Likes:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="qnt_dislikes"
          type="number"
          label="Quantidade de Dislikes:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="qnt_denuncia"
          type="number"
          label="Quantidade de Denúncias:"
        />

        <Input
          :classes="{
            label: 'font-bold',
            input:
              'w-full bg-base-300 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="qnt_favoritos"
          type="number"
          label="Quantidade de Favoritações:"
        />
      </FormSection>
    </FieldsContainer>
  </Form>
</template>
