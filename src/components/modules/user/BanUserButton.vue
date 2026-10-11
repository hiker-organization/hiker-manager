<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'banProcessed'): void
}>()

const userStore = useUserStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await userStore.banUser({}, {
    user: props.user.nome_usuario,
  })

  if (statusCode.value === 200) {
    notify.success('Usuário banido com sucesso.')

    emits('banProcessed')

    return
  }

  notify.error('Erro ao banir o usuário!')
}
</script>

<template>
  <Button
    label="Banir"
    icon="lucide:ban"
    custom-class="btn-error w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
