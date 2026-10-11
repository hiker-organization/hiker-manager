<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useUserStore } from '@/stores/modules/user/user-store'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'unblockProcessed'): void
}>()

const userStore = useUserStore()

async function handleSubmit() {
  await userStore.unblockUser({}, {
    user: props.user.nome_usuario,
  })

  emits('unblockProcessed')
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
