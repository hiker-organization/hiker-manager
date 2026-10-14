import { useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { computed } from 'vue'

type ThemeOptions = 'light' | 'dark'

export const useThemeStore = defineStore('ThemeStore', () => {
  const currentTheme = useLocalStorage<ThemeOptions>('hiker-manager-theme', 'light')

  const isDarkTheme = computed<boolean>(() => currentTheme.value === 'dark')

  function setTheme(theme: ThemeOptions) {
    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'corporate')
    } else {
      document.body.setAttribute('data-theme', 'business')
    }

    currentTheme.value = theme
  }

  function toggleTheme() {
    if (isDarkTheme.value) {
      setTheme('light')
    } else {
      setTheme('dark')
    }
  }

  return {
    currentTheme,
    isDarkTheme,
    setTheme,
    toggleTheme,
  }
})
