<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'

const reportLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Listagem',
    icon: 'lucide:table',
    route: {
      name: 'reportsListing',
    },
    isVisible: true,
  },
])
</script>

<template>
  <RoutesTabMenu :tabs="reportLayoutTabs" title="Denúncias" icon="lucide:message-circle-warning" />
</template>
