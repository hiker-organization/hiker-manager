<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { Icon } from '@iconify/vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
  title: string
  icon: string
  tabs: Array<RouteTab>
}>()

const router = useRouter()

const route = useRoute()

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

    <div class="flex items-center justify-start gap-4">
      <span v-for="tab in props.tabs" :key="tab.label">
        <Button
          v-if="tab.isVisible"
          :class="[
            'btn-primary flex items-center justify-center gap-2 p-4',
            isCurrentTab(tab)
              ? 'bg-primary pointer-events-none'
              : 'bg-primary/25 hover:bg-primary/75',
          ]"
          :label="tab.label"
          :icon="tab.icon"
          @click="openTab(tab)"
        />
      </span>
    </div>

    <RouterView />
  </div>
</template>
