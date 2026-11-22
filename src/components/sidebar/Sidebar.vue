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

const sidebarWidth = computed<string>(() => (isOpen.value ? 'w-80' : 'w-20'))

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
      'min-w-20 h-full bg-base-300 p-4 overflow-hidden transition-all duration-200',
      'flex flex-col items-stretch justify-start gap-4',
      'absolute top-0 left-0 bottom-0 z-10 border-r-2 border-r-base-100',
      sidebarWidth,
    ]"
    @click="isOpen = true"
  >
    <div class="min-w-max flex items-center justify-start gap-4">
      <img class="size-12" src="/icons/favicon.png" alt="logo" />
      <h1 class="text-xl font-extrabold">Hiker Manager</h1>
    </div>

    <div v-for="(item, index) in items" :key="index" class="min-w-max">
      <div
        v-if="!isOpen"
        :class="[
          'w-full flex items-center justify-center p-2 cursor-pointer',
          route.path.startsWith(item.route.path) ? 'bg-primary text-white' : 'bg-base-100',
        ]"
      >
        <Icon :icon="item.icon" />
      </div>

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

    <ThemeButton />
  </div>
</template>
