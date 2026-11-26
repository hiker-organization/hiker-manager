import type { Review } from '@/models/modules/review/review-model'
import { ref, watch } from 'vue'
import { useReviewStore } from '@/stores/modules/review/review-store'

// Estatísticas da postagem (nota, likes...), que a listagem de admin não traz.
export function useReviewDetails(reviewCode: () => number | undefined) {
  const reviewStore = useReviewStore()

  const reviewStatistics = ref<Review | null>(null)

  const isLoading = ref<boolean>(true)

  watch(
    reviewCode,
    async (code) => {
      reviewStatistics.value = null

      if (!code) {
        isLoading.value = false

        return
      }

      isLoading.value = true

      const { data, statusCode } = await reviewStore.getReview({}, { reviewCode: code })

      // Ignora a resposta se outra postagem foi selecionada enquanto carregava.

      if (code !== reviewCode()) {
        return
      }

      isLoading.value = false

      if (statusCode.value === 200 && data.value) {
        reviewStatistics.value = data.value.data
      }
    },
    { immediate: true },
  )

  return {
    reviewStatistics,
    isLoading,
  }
}
