import { ref } from 'vue'

interface CreateFormOptions<T> {
  initialFormData: T
  submitFunction?: () => Promise<void>
}

export function useCreateForm<T>(options: CreateFormOptions<T>) {
  const { initialFormData, submitFunction } = options

  const formData = ref<T>(initialFormData)

  const formIsLoading = ref<boolean>(false)

  async function handleSubmit() {
    if (!submitFunction) {
      return
    }

    try {
      formIsLoading.value = true

      await submitFunction()
    } catch (error) {
      console.error('Erro ao enviar o formulário!', error)
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
