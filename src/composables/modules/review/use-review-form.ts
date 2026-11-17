import type { Review } from '@/models/modules/review/review-model'
import { useRoute } from 'vue-router'
import { useCreateForm } from '@/composables/forms/create-form'
import { computed, onMounted } from 'vue'
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

  onMounted(async () => {
    if (!reviewCode.value) {
      return
    }

    const { data } = await reviewStore.getReview(
      {},
      {
        reviewCode: reviewCode.value,
      },
    )

    if (data.value) {
      reviewFormData.value = data.value.data
    }
  })

  return {
    reviewFormData,
  }
}
