<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { Icon } from '@iconify/vue'
import { useRoute } from 'vue-router'

const props = defineProps<{
  tabs: Array<RouteTab>
}>()

const route = useRoute()

function isCurrentTab(tab: RouteTab) {
  return route.name === tab.route.name
}
</script>

<template>
  <div class="flex flex-col items-start justify-start gap-4">
    <div class="flex items-center justify-start gap-4">
      <span
        v-for="tab in props.tabs"
        :key="tab.label"
        :class="[
          'border border-base-content rounded-md text-base-content',
          isCurrentTab(tab) ? 'bg-primary pointer-events-none' : 'bg-base-300 hover:bg-primary/50',
        ]"
      >
        <RouterLink
          v-if="tab.isVisible"
          :to="tab.route"
          class="flex items-center justify-start gap-2 p-2"
        >
          <Icon :icon="tab.icon" class="text-base-content" />
          {{ tab.label }}
        </RouterLink>
      </span>
    </div>

    <RouterView />
  </div>
</template>
