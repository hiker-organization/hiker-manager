<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { Icon } from '@iconify/vue'
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  icon: string
  tabs: Array<RouteTab>
}>()

const router = useRouter()

const route = useRoute()

const tabSelectorAnchor = useTemplateRef<HTMLDivElement>('currentTabSelectorAnchor')

const tabSelectorIsOpen = ref<boolean>(false)

const currentTab = computed<RouteTab | undefined>(() => {
  return props.tabs.find((tab) => tab.route.name === route.name)
})

onClickOutside(tabSelectorAnchor, () => {
  tabSelectorIsOpen.value = false
})

function isCurrentTab(tab: RouteTab) {
  return route.name === tab.route.name
}

function openTab(tab: RouteTab) {
  router.push(tab.route)
}
</script>

<template>
  <div class="size-full flex flex-col items-start justify-start gap-4">
    <div
      class="w-full min-h-24 bg-base-300 flex flex-col items-center justify-center gap-2 border border-base-content rounded-lg p-4"
    >
      <div class="flex items-center justify-center gap-2">
        <div class="bg-primary/50 rounded-md p-2">
          <Icon :icon="props.icon" class="size-6" />
        </div>
        <span class="text-3xl font-extrabold">{{ props.title }}</span>
      </div>

      <slot name="description" />
    </div>

    <div class="w-full">
      <div class="hidden size-full items-center justify-start gap-4 md:flex">
        <span v-for="tab in props.tabs" :key="tab.label">
          <Button
            v-if="tab.isVisible"
            :custom-class="[
              'btn-primary flex items-center justify-center gap-2 p-4',
              isCurrentTab(tab)
                ? 'bg-primary text-white pointer-events-none'
                : 'bg-primary/25 text-base-content hover:bg-primary/75',
            ]"
            :label="tab.label"
            :icon="tab.icon"
            @click="openTab(tab)"
          />
        </span>
      </div>

      <div class="relative visible md:hidden">
        <div
          ref="currentTabSelectorAnchor"
          class="bg-base-300 flex items-center justify-between gap-4 rounded-md p-4 cursor-pointer"
          @click="tabSelectorIsOpen = !tabSelectorIsOpen"
        >
          <div class="flex items-center justify-start gap-2">
            <Icon :icon="currentTab?.icon || 'lucide:globe'" />

            {{ currentTab?.label || 'Abas' }}
          </div>

          <Icon
            icon="lucide:chevron-down"
            :class="['transition-all duration-250', { 'rotate-180': tabSelectorIsOpen }]"
          />
        </div>

        <div
          v-show="tabSelectorIsOpen"
          :class="[
            'absolute top-full left-0 right-0',
            'w-full bg-base-300 flex flex-col items-stretch justify-start border border-base-content/40 mt-2',
          ]"
        >
          <span v-for="tab in props.tabs" :key="tab.label">
            <Button
              v-if="tab.isVisible"
              :custom-class="[
                'btn-primary w-full flex items-center justify-center gap-2 border-none rounded-none p-4',
                isCurrentTab(tab)
                  ? 'bg-primary/50 text-white pointer-events-none'
                  : 'bg-transparent text-base-content hover:bg-base-200',
              ]"
              :label="tab.label"
              :icon="tab.icon"
              @click="openTab(tab)"
            />
          </span>
        </div>
      </div>
    </div>

    <RouterView />
  </div>
</template>
