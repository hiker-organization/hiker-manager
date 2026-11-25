<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useSidebarStore } from '@/stores/core/sidebar-store'

// A sidebar fica sobreposta, então o conteúdo reserva o espaço da largura atual dela.

const { isOpen: sidebarIsOpen } = storeToRefs(useSidebarStore())
</script>

<template>
  <div class="relative size-full flex">
    <Sidebar />
    <main class="h-full min-w-0 flex-1 bg-base-100 pb-4">
      <div
        :class="[
          'size-full overflow-x-hidden pt-4 pl-4 pr-4 overflow-y-auto transition-all duration-200',
          sidebarIsOpen ? 'md:pl-76' : 'md:pl-24',
        ]"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>
