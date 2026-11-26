<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth/auth-store'
import { useSidebarStore } from '@/stores/core/sidebar-store'

// A sidebar fica sobreposta, então o topo e o conteúdo reservam o espaço da largura atual dela.

const { isOpen: sidebarIsOpen } = storeToRefs(useSidebarStore())

const { sessionUser } = storeToRefs(useAuthStore())

const sidebarOffset = computed<string>(() => (sidebarIsOpen.value ? 'md:pl-76' : 'md:pl-24'))

// Inicial do email, exibida no avatar do topo.

const userInitial = computed<string>(() => sessionUser.value?.email.charAt(0).toUpperCase() ?? '')

// A foto volta para a inicial se não carregar (ex.: a URL assinada expirou).

const photoFailed = ref<boolean>(false)

watch(
  () => sessionUser.value?.foto_url,
  () => {
    photoFailed.value = false
  },
)
</script>

<template>
  <div class="relative size-full flex">
    <Sidebar />
    <main class="h-full min-w-0 flex-1 bg-base-200 flex flex-col">
      <header
        :class="[
          'h-16 shrink-0 bg-(--topbar-bg) flex items-center justify-end gap-3 px-4 shadow-sm transition-all duration-200',
          sidebarOffset,
        ]"
      >
        <template v-if="sessionUser">
          <span class="hidden text-sm text-base-content/70 md:inline">{{ sessionUser.email }}</span>

          <img
            v-if="sessionUser.foto_url && !photoFailed"
            :src="sessionUser.foto_url"
            :title="sessionUser.email"
            alt="Foto de perfil"
            class="size-10 rounded-full object-cover"
            @error="photoFailed = true"
          />

          <div
            v-else
            :title="sessionUser.email"
            class="size-10 bg-primary text-primary-content flex items-center justify-center rounded-full font-bold"
          >
            {{ userInitial }}
          </div>
        </template>
      </header>

      <div
        :class="[
          'min-h-0 flex-1 overflow-x-hidden overflow-y-auto pt-6 pl-4 pr-4 pb-4 transition-all duration-200 md:pr-8',
          sidebarOffset,
        ]"
      >
        <RouterView />
      </div>
    </main>
  </div>
</template>
