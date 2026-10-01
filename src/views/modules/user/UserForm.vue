<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useRoute } from 'vue-router'
import { useCreateForm } from '@/composables/forms/create-form'
import { computed, onMounted } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'

const userStore = useUserStore()

const route = useRoute()

const user = computed<string | undefined>(() => {
  if (!route.params.user) {
    return undefined
  }

  return String(route.params.user)
})

const { formData } = useCreateForm<User>({
  initialFormData: {
    nome_usuario: '',
    nome_exibicao: '',
    email: '',
    data_nascimento: '',
    numero_celular: '',
    foto_url: null,
    reputacao: 0,
    cargo: 'USER',
    bloqueado: false,
  },
})

onMounted(async () => {
  if (!user.value) {
    return
  }

  const { data } = await userStore.getUser(
    {},
    {
      user: user.value,
    },
  )

  if (data.value) {
    formData.value = data.value.data
  }
})
</script>

<template>
  <Form
    v-model:form="formData"
    :classes="{
      form: 'size-full flex items-stretch justify-stretch gap-4',
    }"
  >
    <FieldsContainer>
      <h1>Teste</h1>
    </FieldsContainer>

    <ToggleFieldsContainer>
      <Toggle v-model:is-checked="formData.bloqueado" label="Bloqueado" />
    </ToggleFieldsContainer>
  </Form>
</template>
