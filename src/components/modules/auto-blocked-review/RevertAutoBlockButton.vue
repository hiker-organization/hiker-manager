<script setup lang="ts">
import type { AutoBlockedReviewListRow } from '@/models/modules/auto-blocked-review/auto-blocked-review-model'
import { useAutoBlockedReviewStore } from '@/stores/modules/auto-blocked-review/auto-blocked-review-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  review: AutoBlockedReviewListRow
}>()

const emits = defineEmits<{
  (e: 'revertProcessed'): void
}>()

const autoBlockedReviewStore = useAutoBlockedReviewStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await autoBlockedReviewStore.moderateAutoBlockedReview(
    {
      status: 'AUTORIZADA',
    },
    {},
    {
      reviewCode: props.review.id,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Bloqueio revertido com sucesso.')

    emits('revertProcessed')

    return
  }

  notify.error('Erro ao reverter o bloqueio!')
}
</script>

<template>
  <Button
    label="Liberar"
    icon="lucide:check"
    custom-class="btn-success w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
