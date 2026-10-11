<script setup lang="ts">
import type { User, UserBlockingParameters } from '@/models/modules/user/user-model'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useCreateForm } from '@/composables/forms/create-form'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'blockProcessed'): void
}>()

const userStore = useUserStore()

const { notify } = useToast()

const blockModalIsVisible = ref<boolean>(false)

const { formData: userBlockFormData, formIsLoading: userBlockFormIsLoading, handleSubmit: userBlockFormHandleSubmit } = useCreateForm<UserBlockingParameters>({
  initialFormData: {
    data: ''
  },
  submitFunction: async () => {
    const { statusCode } = await userStore.blockUser(
      {
      data: userBlockFormData.value.data
      },
      {},
      {
        user: props.user.nome_usuario,
      },
    )

    if (statusCode.value === 200) {
      notify.success('Usuário bloqueado com sucesso.')

      blockModalIsVisible.value = false

      emits('blockProcessed')

      return
    }

    notify.error('Erro ao bloquear o usuário!')
  }
})
</script>

<template>
  <div>
    <Button
      label="Bloquear"
      icon="lucide:lock"
      custom-class="btn-warning w-full flex items-center justify-center gap-2 p-4"
      @click="blockModalIsVisible = true"
    />

    <Modal
      v-model:is-visible="blockModalIsVisible"
      :title="`Bloqueio de Usuário (${props.user.nome_usuario})`"
    >
      <Form
        v-model:form="userBlockFormData"
        :classes="{
          form: 'w-full flex flex-col items-center justify-center gap-4',
        }"
        :disabled="userBlockFormIsLoading"
        @submit="userBlockFormHandleSubmit"
      >
        <Input
          :classes="{
            label: 'font-bold',
            outer: 'w-full',
            input:
              'w-full bg-base-100 border border-base-content/50 text-base-content rounded-md mt-2 p-1',
          }"
          name="data"
          label="Expiração:"
          type="date"
        />

        <ActionButton
          :classes="{
            outer: 'w-full bg-success/50 rounded-md hover:bg-success',
            input:
              'w-full flex items-center justify-center gap-2 text-success-content p-2 cursor-pointer',
          }"
          :label="{
            text: userBlockFormIsLoading ? 'Carregando' : 'Enviar',
          }"
          :icon="{
            name: userBlockFormIsLoading ? 'lucide:loader-circle' : 'lucide:save',
            class: [{ 'animate-spin': userBlockFormIsLoading }],
          }"
          type="submit"
        />
      </Form>
    </Modal>
  </div>
</template>
