<script setup lang="ts">
import type { MenuItem, MenuSection } from '@/constants/sidebar/menu-items'
import { Icon } from '@iconify/vue'
import { onClickOutside, useDebounceFn } from '@vueuse/core'
import { computed, ref, useTemplateRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { items } from '@/constants/sidebar/menu-items'

const route = useRoute()

const componentAnchor = useTemplateRef('anchor')

const isOpen = ref<boolean>(false)

const sidebarWidth = computed<string>(() =>
  isOpen.value ? 'w-72 p-4' : 'min-w-0 w-0 p-0 md:min-w-20 md:w-20 md:p-4',
)

onClickOutside(componentAnchor, () => {
  isOpen.value = false
})

function isMenuItem(item: MenuItem | MenuSection): item is MenuItem {
  return 'name' in item.route
}

watch(
  () => route.path,
  () => {
    /*
      Impede travamentos devido a concorrência de execução, exigindo um intervalo
      mínimo entre cada uma para então aplicar o callback.
    */

    useDebounceFn(() => {
      isOpen.value = false
    }, 100)()
  },
)
</script>

<template>
  <div
    ref="anchor"
    :class="[
      'h-full bg-base-300 transition-all duration-200',
      'flex flex-col items-stretch justify-between gap-4',
      'absolute top-0 left-0 bottom-0 z-10 border-r-2 border-r-base-100',
      sidebarWidth,
    ]"
  >
    <!-- Estrutura do menu. -->

    <div class="w-full flex flex-col items-start justify-stretch gap-4 overflow-hidden">
      <RouterLink
        :to="{ name: 'home' }"
        class="min-w-max flex items-center justify-start gap-4 cursor-pointer"
        title="Página inicial"
      >
        <img class="size-11" src="/icons/favicon.png" alt="logo" />
        <h1 class="text-xl font-extrabold">Hiker Manager</h1>
      </RouterLink>

      <!-- Abre e fecha o menu no modo desktop. -->

      <button
        type="button"
        :title="isOpen ? 'Recolher menu' : 'Expandir menu'"
        :class="[
          'hidden items-center gap-2 p-2 bg-base-100 cursor-pointer transition-all duration-150 hover:bg-primary/50 md:flex',
          isOpen ? 'w-full justify-start' : 'w-11 justify-center',
        ]"
        @click="isOpen = !isOpen"
      >
        <Icon :icon="isOpen ? 'lucide:panel-left-close' : 'lucide:panel-left-open'" />
        <span v-if="isOpen">Recolher menu</span>
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
              'w-11 flex items-center justify-center p-2 cursor-pointer transition-all duration-150 hover:bg-primary/50',
              route.path.startsWith(item.route.path) ? 'bg-primary text-white' : 'bg-base-100',
            ]"
          >
            <Icon :icon="item.icon" />
          </RouterLink>

          <!-- Seções têm subitens, então o clique abre o menu para exibi-los. -->

          <div
            v-else
            :title="item.label"
            :class="[
              'w-11 flex items-center justify-center p-2 cursor-pointer transition-all duration-150 hover:bg-primary/50',
              route.path.startsWith(item.route.path) ? 'bg-primary text-white' : 'bg-base-100',
            ]"
            @click="isOpen = true"
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
            'w-full flex items-center justify-start gap-2 p-2 cursor-pointer transition-all duration-150 hover:bg-primary/50',
            route.path.startsWith(item.route.path) ? 'bg-primary/75 text-white' : 'bg-base-100',
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
                'w-full flex items-center justify-start gap-2 p-2 cursor-pointer transition-all duration-150 hover:bg-primary/25',
                route.path.startsWith(subItem.route.path)
                  ? 'bg-primary/50 text-white'
                  : 'bg-base-200',
              ]"
            >
              <Icon :icon="subItem.icon" />
              {{ subItem.label }}
            </RouterLink>
          </template>
        </SidebarSection>
      </div>
    </div>

    <!-- Troca o tema da aplicação. -->

    <div class="w-full overflow-hidden">
      <ThemeButton />
    </div>

    <!-- Abre e fecha o menu no modo mobile. -->

    <Button
      icon="lucide:arrow-right"
      :custom-class="[
        'z-10 absolute bottom-0 left-full md:hidden',
        'btn-primary rounded-l-none rounded-r-full',
      ]"
      @click="isOpen = !isOpen"
    >
      <Icon
        :class="['transition-all duration-200', { 'rotate-180': isOpen }]"
        icon="lucide:arrow-right"
      />
    </Button>
  </div>
</template>
