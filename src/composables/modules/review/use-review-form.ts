import type { Review } from '@/models/modules/review/review-model'
import { useRoute } from 'vue-router'
import { useCreateForm } from '@/composables/forms/create-form'
import { computed, onMounted, ref } from 'vue'
import { useReviewStore } from '@/stores/modules/review/review-store'

export function useReviewForm() {
  const reviewStore = useReviewStore()

  const route = useRoute()

  const reviewCode = computed<number | undefined>(() => {
    const param = route.params.reviewCode

    if (!param) {
      return undefined
    }

    return Number(param)
  })

  const { formData: reviewFormData } = useCreateForm<Review>({
    initialFormData: {
      descricao: '',
      local: '',
      qnt_likes: 0,
      qnt_dislikes: 0,
      qnt_denuncia: 0,
      qnt_favoritos: 0,
      nota: 0,
      createdAt: '',
      liked: false,
      disliked: false,
      reported: false,
      favorited: false,
    },
  })

  // Começa verdadeiro, pois a busca é disparada ao montar o formulário.

  const isLoading = ref<boolean>(true)

  onMounted(async () => {
    if (!reviewCode.value) {
      isLoading.value = false

      return
    }

    const { data } = await reviewStore.getReview(
      {},
      {
        reviewCode: reviewCode.value,
      },
    )

    isLoading.value = false

    if (data.value) {
      reviewFormData.value = data.value.data
    }
  })

  return {
    reviewFormData,
    isLoading,
  }
}
