<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useToast } from '@/composables/notify/toastify'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'unblockProcessed'): void
}>()

const userStore = useUserStore()

const { notify } = useToast()

async function handleSubmit() {
  const { statusCode } = await userStore.unblockUser({}, {
    user: props.user.nome_usuario,
  })

  if (statusCode.value === 200) {
    notify.success('Usuário desbloqueado com sucesso.')

    emits('unblockProcessed')

    return
  }

  notify.error('Erro ao desbloquear o usuário!')
}
</script>

<template>
  <Button
    label="Desbloquear"
    icon="lucide:lock-open"
    custom-class="btn-success w-full flex items-center justify-center gap-2 p-4"
    @click="handleSubmit"
  />
</template>
