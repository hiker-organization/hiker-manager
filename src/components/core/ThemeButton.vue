<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/core/theme-store'

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <button
      data-cy="theme-button"
      class="size-11 bg-white/10 flex items-center justify-center rounded-full cursor-pointer transition-all duration-150 hover:bg-white/20"
      @click="themeStore.toggleTheme"
    >
      <Icon
        :icon="themeStore.isDarkTheme ? 'lucide:sun' : 'lucide:moon'"
        class="size-6 text-white"
      />
    </button>
  </div>
</template>
