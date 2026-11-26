<script setup lang="ts">
import type { ReviewListRow } from '@/models/modules/review/review-model'
import { computed } from 'vue'
import { useReviewDetails } from '@/composables/modules/review/use-review-details'
import { getNormalizedDate } from '@/utils/data/formatting/date-formatting-utils'

// Postagem completa: os dados da linha da listagem mais as estatísticas buscadas na API.

const props = defineProps<{
  review: ReviewListRow
}>()

const NOT_DEFINED: string = 'Não Definido(a)'

const { reviewStatistics, isLoading } = useReviewDetails(() => props.review.id)

const reviewFields = computed<Array<{ label: string; value: string }>>(() => {
  const { review } = props

  const city = [review.lugar.cidade, review.lugar.sigla_estado].filter(Boolean).join('/')

  return [
    { label: 'ID', value: String(review.id) },
    { label: 'Descrição', value: review.descricao },
    { label: 'Autor', value: review.autor.nome_usuario },
    { label: 'Local', value: city ? `${review.lugar.nome} (${city})` : review.lugar.nome },
    {
      label: 'Tags',
      value: review.tags.map((tag) => tag.tag.descritivo).join(', ') || NOT_DEFINED,
    },
    { label: 'Data de Criação', value: getNormalizedDate(review.createdAt) },
    { label: 'Denúncias Efetuadas', value: String(review.qnt_denuncia) },
  ]
})

const statisticsFields = computed<Array<{ label: string; value: string }>>(() => {
  const statistics = reviewStatistics.value

  return [
    { label: 'Nota', value: statistics ? String(statistics.nota) : NOT_DEFINED },
    { label: 'Likes', value: statistics ? String(statistics.qnt_likes) : NOT_DEFINED },
    { label: 'Dislikes', value: statistics ? String(statistics.qnt_dislikes) : NOT_DEFINED },
    {
      label: 'Favoritações',
      value: statistics ? String(statistics.qnt_favoritos) : NOT_DEFINED,
    },
  ]
})
</script>

<template>
  <DetailsList :fields="reviewFields">
    <DetailsItem v-for="field in statisticsFields" :key="field.label" :label="field.label">
      <div v-if="isLoading" class="skeleton h-4 w-16 mt-1"></div>

      <template v-else>{{ field.value }}</template>
    </DetailsItem>
  </DetailsList>
</template>
