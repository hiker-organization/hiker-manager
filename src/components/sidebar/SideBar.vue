<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { items } from '@/constants/sidebar/menu-items.ts'

const componentAnchor = useTemplateRef('anchor')

const isOpen = ref<boolean>(false)

const sidebarWidth = computed<string>(() => (isOpen.value ? 'w-80' : 'w-20'))

onClickOutside(componentAnchor, () => {
  isOpen.value = false
})
</script>

<template>
  <div
    ref="anchor"
    :class="[
      'min-w-20 h-full bg-base-300 flex flex-col items-stretch justify-start gap-4 p-4 overflow-hidden transition-all duration-200',
      sidebarWidth,
    ]"
    @click="isOpen = true"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="min-w-max flex items-center justify-start gap-4">
      <img class="size-12" src="/icons/favicon.png" alt="logo" />
      <h1 class="text-xl font-extrabold">Hiker Manager</h1>
    </div>

    <div v-for="(item, index) in items" :key="index" class="min-w-max">
      <div
        v-if="!isOpen"
        class="w-full bg-base-100 flex items-center justify-center p-2 cursor-pointer"
      >
        <Icon :icon="item.icon" />
      </div>

      <RouterLink
        v-else-if="'routeName' in item"
        :to="{
          name: item.routeName,
        }"
        class="w-full bg-base-100 flex items-center justify-start gap-2 p-2 cursor-pointer transition-all duration-150 hover:bg-primary/50"
      >
        <Icon :icon="item.icon" />
        {{ item.label }}
      </RouterLink>

      <SideBarSection v-else>
        <template #sectionTitle>
          <Icon :icon="item.icon" />
          {{ item.label }}
        </template>

        <template #subItems>
          <RouterLink
            v-for="(subItem, index) in item.children"
            :key="index"
            :to="{
              name: subItem.routeName,
            }"
            class="w-full bg-base-200 flex items-center justify-start gap-2 p-2 cursor-pointer transition-all duration-150 hover:bg-primary/25"
          >
            <Icon :icon="subItem.icon" />
            {{ subItem.label }}
          </RouterLink>
        </template>
      </SideBarSection>
    </div>

    <ThemeButton />
  </div>
</template>
