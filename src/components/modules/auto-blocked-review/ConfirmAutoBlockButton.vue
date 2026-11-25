<script setup lang="ts">
import type { AutoBlockedReviewListRow } from '@/models/modules/auto-blocked-review/auto-blocked-review-model'
import { useAutoBlockedReviewStore } from '@/stores/modules/auto-blocked-review/auto-blocked-review-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  review: AutoBlockedReviewListRow
}>()

const emits = defineEmits<{
  (e: 'confirmProcessed'): void
}>()

const autoBlockedReviewStore = useAutoBlockedReviewStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await autoBlockedReviewStore.moderateAutoBlockedReview(
    {
      status: 'OFENSIVA',
    },
    {},
    {
      reviewCode: props.review.id,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Bloqueio confirmado com sucesso.')

    emits('confirmProcessed')

    return
  }

  notify.error('Erro ao confirmar o bloqueio!')
}
</script>

<template>
  <Button
    label="Manter Bloqueio"
    icon="lucide:ban"
    custom-class="btn-error w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
