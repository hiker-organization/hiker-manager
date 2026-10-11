<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import { useUserStore } from '@/stores/modules/user/user-store'

const props = defineProps<{
  user: User
}>()

const emits = defineEmits<{
  (e: 'banProcessed'): void
}>()

const userStore = useUserStore()

async function handleSubmit() {
  await userStore.banUser({}, {
    user: props.user.nome_usuario,
  })

  emits('banProcessed')
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
