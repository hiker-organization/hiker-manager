<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from '@/stores/core/theme-store'

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
  <RouterView />
</template>
