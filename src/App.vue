<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/core/theme-store'
import { ToastifyContainer } from 'vue3-toastify'

const themeStore = useThemeStore()

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
    <RouterView />

    <ToastifyContainer />
  </div>
</template>
