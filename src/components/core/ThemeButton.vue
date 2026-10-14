<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useThemeStore } from '@/stores/core/theme-store'

const themeStore = useThemeStore()
</script>

<template>
  <div>
    <button
      class="fixed left-4 bottom-4 size-12 bg-base-content flex items-center justify-center rounded-full cursor-pointer"
      @click="themeStore.toggleTheme"
    >
      <Icon
        :icon="themeStore.isDarkTheme ? 'lucide:sun' : 'lucide:moon'"
        class="size-6 text-base-100"
      />
    </button>
  </div>
</template>
