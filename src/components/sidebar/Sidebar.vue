<script setup lang="ts">
import type { MenuItem, MenuSection } from '@/constants/sidebar/menu-items'
import { Icon } from '@iconify/vue'
import { breakpointsTailwind, onClickOutside, useBreakpoints } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { computed, useTemplateRef } from 'vue'
import { useRoute } from 'vue-router'
import { items } from '@/constants/sidebar/menu-items'
import { useSidebarStore } from '@/stores/core/sidebar-store'

const route = useRoute()

const sidebarStore = useSidebarStore()

// O estado fica no store para o layout acompanhar a largura; muda pelos botões e, no mobile, por um clique fora.

const { isOpen } = storeToRefs(sidebarStore)

const sidebarWidth = computed<string>(() =>
  isOpen.value ? 'w-72 p-4' : 'min-w-0 w-0 p-0 md:min-w-20 md:w-20 md:p-4',
)

// No mobile a sidebar cobre o conteúdo, então um clique fora dela a fecha.

const sidebarElement = useTemplateRef<HTMLDivElement>('sidebar')

const isMobile = useBreakpoints(breakpointsTailwind).smaller('md')

onClickOutside(sidebarElement, () => {
  if (isMobile.value && isOpen.value) {
    sidebarStore.closeSidebar()
  }
})

function isMenuItem(item: MenuItem | MenuSection): item is MenuItem {
  return 'name' in item.route
}
</script>

<template>
  <div
    ref="sidebar"
    :class="[
      'h-full bg-(--sidebar-bg) text-white transition-all duration-200',
      'flex flex-col items-stretch justify-between gap-4',
      'absolute top-0 left-0 bottom-0 z-10',
      sidebarWidth,
    ]"
  >
    <!-- Estrutura do menu. -->

    <div class="w-full flex flex-col items-start justify-stretch gap-4 overflow-hidden">
      <div class="w-full flex items-center justify-between gap-2">
        <RouterLink
          :to="{ name: 'home' }"
          class="min-w-max flex items-center justify-start gap-4 cursor-pointer"
          title="Página inicial"
        >
          <img class="size-11" src="/icons/favicon.png" alt="logo" />
          <h1 class="text-xl font-extrabold text-white">Hiker Manager</h1>
        </RouterLink>

        <!-- Recolhe o menu no modo desktop (no mobile, a seta lateral faz isso). -->

        <button
          v-if="isOpen"
          type="button"
          title="Recolher menu"
          class="hidden size-8 items-center justify-center rounded-md text-white/85 cursor-pointer transition-all duration-150 hover:bg-white/10 hover:text-white md:flex"
          @click="sidebarStore.toggleSidebar"
        >
          <Icon icon="lucide:chevrons-left" class="size-5" />
        </button>
      </div>

      <!-- Expande o menu no modo desktop: a mesma seta, abaixo do logo por falta de espaço. -->

      <button
        v-if="!isOpen"
        type="button"
        title="Expandir menu"
        class="hidden w-11 items-center justify-center rounded-lg p-2 text-white/85 cursor-pointer transition-all duration-150 hover:bg-white/10 hover:text-white md:flex"
        @click="sidebarStore.toggleSidebar"
      >
        <Icon icon="lucide:chevrons-right" />
      </button>

      <div v-for="(item, index) in items" :key="index" class="w-full">
        <template v-if="!isOpen">
          <RouterLink
            v-if="isMenuItem(item)"
            :to="{
              name: item.route.name,
            }"
            :title="item.label"
            :class="[
              'w-11 flex items-center justify-center rounded-lg p-2 cursor-pointer transition-all duration-150',
              route.path.startsWith(item.route.path)
                ? 'bg-(--sidebar-active) text-white'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
          >
            <Icon :icon="item.icon" />
          </RouterLink>

          <!-- Seções têm subitens, então o clique abre o menu para exibi-los. -->

          <div
            v-else
            :title="item.label"
            :class="[
              'w-11 flex items-center justify-center rounded-lg p-2 cursor-pointer transition-all duration-150',
              route.path.startsWith(item.route.path)
                ? 'bg-(--sidebar-active) text-white'
                : 'text-white/85 hover:bg-white/10 hover:text-white',
            ]"
            @click="sidebarStore.openSidebar"
          >
            <Icon :icon="item.icon" />
          </div>
        </template>

        <RouterLink
          v-else-if="isMenuItem(item)"
          :to="{
            name: item.route.name,
          }"
          :class="[
            'w-full flex items-center justify-start gap-2 rounded-lg p-2 cursor-pointer transition-all duration-150',
            route.path.startsWith(item.route.path)
              ? 'bg-(--sidebar-active) text-white'
              : 'text-white/85 hover:bg-white/10 hover:text-white',
          ]"
        >
          <Icon :icon="item.icon" />
          {{ item.label }}
        </RouterLink>

        <SidebarSection v-else :is-current-selection="route.path.startsWith(item.route.path)">
          <template #sectionTitle>
            <Icon :icon="item.icon" />
            {{ item.label }}
          </template>

          <template #subItems>
            <RouterLink
              v-for="(subItem, index) in item.children"
              :key="index"
              :to="{
                name: subItem.route.name,
              }"
              :class="[
                'w-full flex items-center justify-start gap-2 rounded-lg p-2 pl-8 cursor-pointer transition-all duration-150',
                route.path.startsWith(subItem.route.path)
                  ? 'bg-white/15 text-white'
                  : 'text-white/75 hover:bg-white/10 hover:text-white',
              ]"
            >
              <Icon :icon="subItem.icon" />
              {{ subItem.label }}
            </RouterLink>
          </template>
        </SidebarSection>
      </div>
    </div>

    <!-- Troca o tema da aplicação e encerra a sessão. -->

    <div
      :class="[
        'w-full flex justify-between gap-2 overflow-hidden',
        isOpen ? 'flex-row' : 'flex-col',
      ]"
    >
      <ThemeButton />

      <LogoutButton :show-label="isOpen" />
    </div>

    <!-- Abre e fecha o menu no modo mobile, alinhado ao topo da página. -->

    <Button
      icon="lucide:arrow-right"
      :custom-class="[
        'z-10 absolute top-3 left-full md:hidden',
        'btn-primary rounded-l-none rounded-r-full',
      ]"
      @click="sidebarStore.toggleSidebar"
    >
      <Icon
        :class="['transition-all duration-200', { 'rotate-180': isOpen }]"
        icon="lucide:arrow-right"
      />
    </Button>
  </div>
</template>
