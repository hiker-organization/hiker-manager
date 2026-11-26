<script setup lang="ts">
import { useReviewList } from '@/composables/modules/review/use-review-list'
import { REVIEW_TABLE_COLUMNS } from '@/constants/modules/review/review-table-columns'

const {
  namespace,
  reviews,
  pagination,
  isLoading,
  actionsModalIsVisible,
  detailsModalIsVisible,
  selectedReview,
  openActionsModal,
  openDetailsModal,
  setNamespaceQueryParams,
} = useReviewList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace="namespace"
      :columns="REVIEW_TABLE_COLUMNS"
      :rows="reviews"
      :pagination="pagination"
      :is-loading="isLoading"
      @update-params="(params) => setNamespaceQueryParams(params)"
    >
      <!-- A descrição tem até 150 caracteres: quebra em poucas linhas, sem cortar o texto. -->

      <template #descricao="{ data }">
        <span class="block max-w-sm whitespace-normal break-words md:min-w-64">{{
          data.descricao
        }}</span>
      </template>

      <template #cardTitle="{ data }">
        <span class="font-extrabold truncate">#{{ data.id }}</span>
      </template>

      <template #registerActions="{ data }">
        <Button
          custom-class="btn-primary w-full flex items-center justify-center gap-2 p-4 md:w-auto"
          label="Opções"
          icon="lucide:sparkles"
          @click="openActionsModal(data)"
        />
      </template>
    </Table>

    <Modal
      v-if="selectedReview"
      v-model:is-visible="actionsModalIsVisible"
      :title="`Ações (#${selectedReview.id})`"
      icon="lucide:pencil-line"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <Button
          label="Dados Completos"
          icon="lucide:form"
          custom-class="btn-info w-full flex items-center justify-center gap-2 p-4"
          @click="openDetailsModal"
        />

        <RouterLink
          :to="{
            name: 'reviewReportsListing',
            params: {
              reviewCode: selectedReview.id,
            },
          }"
          class="w-full"
        >
          <Button
            label="Denúncias"
            icon="lucide:message-circle-warning"
            custom-class="btn-error w-full flex items-center justify-center gap-2 p-4"
          />
        </RouterLink>
      </div>
    </Modal>

    <Modal
      v-if="selectedReview"
      v-model:is-visible="detailsModalIsVisible"
      :title="`Postagem (#${selectedReview.id})`"
      icon="lucide:pencil-line"
    >
      <!-- Montado só com o modal aberto, pois busca as estatísticas na API. -->

      <ReviewDetails v-if="detailsModalIsVisible" :review="selectedReview" />
    </Modal>
  </div>
</template>
