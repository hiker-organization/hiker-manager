import type { User } from '@/models/modules/user/user-model'
import { useRoute } from 'vue-router'
import { useCreateForm } from '@/composables/forms/create-form'
import { computed, onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'

export function useUserForm() {
  const userStore = useUserStore()

  const route = useRoute()

  const user = computed<string | undefined>(() => {
    const param = route.params.user

    if (!param) {
      return undefined
    }

    return String(param)
  })

  const { formData: userFormData } = useCreateForm<User>({
    initialFormData: {
      id: 0,
      cargo: 'USER',
      nome_usuario: '',
      nome_exibicao: '',
      email: '',
      data_nascimento: null,
      numero_celular: '',
      reputacao: 0,
      foto_url: null,
      banido: false,
      bloqueado: false,
      bloqueado_ate: null,
    },
  })

  const normalizedBirthDate = computed<string>({
    get: () => {
      if (!userFormData.value.data_nascimento) {
        return ''
      }

      return userFormData.value.data_nascimento.slice(0, 10)
    },
    set: (value: string) => {
      console.log(value)

      userFormData.value.data_nascimento = value
    },
  })

  const normalizedBlockExpirationDate = computed<string>({
    get: () => {
      if (!userFormData.value.bloqueado_ate) {
        return ''
      }

      return userFormData.value.bloqueado_ate.slice(0, 10)
    },
    set: (value: string) => {
      console.log(value)

      userFormData.value.bloqueado_ate = value
    },
  })

  // Começa verdadeiro, pois a busca é disparada ao montar o formulário.

  const isLoading = ref<boolean>(true)

  onMounted(async () => {
    if (!user.value) {
      isLoading.value = false

      return
    }

    const { data } = await userStore.getUser(
      {},
      {
        user: user.value,
      },
    )

    isLoading.value = false

    if (data.value) {
      userFormData.value = data.value.data
    }
  })

  return {
    userFormData,
    normalizedBirthDate,
    normalizedBlockExpirationDate,
    isLoading,
  }
}
