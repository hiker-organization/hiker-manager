<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useToast } from '@/composables/notify/toastify'

const router = useRouter()

const authStore = useAuthStore()

const { notify } = useToast()

async function handleLogout() {
  // A sessão local é limpa pelo store mesmo se a API falhar, então sempre vai ao login.

  await authStore.logout()

  notify.success('Sessão encerrada.')

  router.push({
    name: 'login',
  })
}
</script>

<template>
  <div>
    <button
      data-cy="logout-button"
      title="Sair"
      class="size-11 bg-error flex items-center justify-center rounded-full cursor-pointer"
      @click="handleLogout"
    >
      <Icon icon="lucide:log-out" class="size-6 text-error-content" />
    </button>
  </div>
</template>
