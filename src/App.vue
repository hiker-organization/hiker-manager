<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/core/theme-store'
import { useAuthStore } from '@/stores/auth/auth-store'
import { ToastifyContainer } from 'vue3-toastify'

const themeStore = useThemeStore()

const authStore = useAuthStore()

onMounted(() => {
  if (themeStore.isDarkTheme) {
    themeStore.setTheme('dark')
  } else {
    themeStore.setTheme('light')
  }
})
</script>

<template>
  <div class="size-full">
    <!-- Exibido enquanto a sessão é verificada, no lugar da página protegida. -->

    <div
      v-if="authStore.isCheckingSession"
      class="size-full bg-base-200 flex flex-col items-center justify-center gap-4"
    >
      <img class="size-16" src="/icons/favicon.png" alt="logo" />

      <Icon icon="lucide:loader-circle" class="size-6 animate-spin" />
    </div>

    <RouterView v-else />

    <ToastifyContainer />
  </div>
</template>
