import { ref } from 'vue'

interface CreateGeneralFormOptions<T> {
  initialFormData: T
  submitFunction: () => Promise<void>
}

export function useCreateGeneralForm<T>(options: CreateGeneralFormOptions<T>) {
  const { initialFormData, submitFunction } = options

  const formData = ref<T>(initialFormData)

  const formIsLoading = ref<boolean>(false)

  async function handleSubmit() {
    try {
      formIsLoading.value = true

      await submitFunction()
    } finally {
      formIsLoading.value = false
    }
  }

  return {
    formData,
    formIsLoading,
    handleSubmit,
  }
}
