import { breakpointsTailwind, useLocalStorage } from '@vueuse/core'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('SidebarStore', () => {
  /*
    Guarda a última escolha feita pelo botão. Sem escolha salva, vem expandida em telas
    grandes e contraída nas menores (o padrão não é gravado, só a escolha do usuário).
  */

  const isOpen = useLocalStorage<boolean>(
    'hiker-manager-sidebar-open',
    window.matchMedia(`(min-width: ${breakpointsTailwind.lg}px)`).matches,
    { writeDefaults: false },
  )

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
