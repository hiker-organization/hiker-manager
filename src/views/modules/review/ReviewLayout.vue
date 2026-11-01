<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'

const reviewLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Listagem',
    icon: 'lucide:table',
    route: {
      name: 'reviewsListing',
    },
    isVisible: true,
  }
])
</script>

<template>
  <RoutesTabMenu :tabs="reviewLayoutTabs" title="Postagens" icon="lucide:pencil-line" />
</template>
