<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useLogout } from '@/composables/auth/use-logout'

const { handleLogout } = useLogout()
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
