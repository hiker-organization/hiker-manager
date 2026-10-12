<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps<{
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
  <div class="flex flex-col items-start justify-start gap-4">
    <div class="flex items-center justify-start gap-4">
      <span
        v-for="tab in props.tabs"
        :key="tab.label"
      >
        <Button
          v-if="tab.isVisible"
          :label="tab.label"
          :icon="tab.icon"
          :disabled="isCurrentTab(tab)"
          @click="openTab(tab)"
        />
      </span>
    </div>

    <RouterView />
  </div>
</template>
