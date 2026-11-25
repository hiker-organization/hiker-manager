import { breakpointsTailwind } from '@vueuse/core'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSidebarStore = defineStore('SidebarStore', () => {
  // Expandida por padrão em telas grandes. Depois disso, só muda pelo botão.

  const isOpen = ref<boolean>(window.matchMedia(`(min-width: ${breakpointsTailwind.lg}px)`).matches)

  function toggleSidebar() {
    isOpen.value = !isOpen.value
  }

  function openSidebar() {
    isOpen.value = true
  }

  return {
    isOpen,
    toggleSidebar,
    openSidebar,
  }
})
