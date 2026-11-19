<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'

const dashboardLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Usuários',
    icon: 'lucide:user-2',
    route: {
      name: 'usersDashboard',
    },
    isVisible: true,
  },
  {
    label: 'Postagens',
    icon: 'lucide:pencil-line',
    route: {
      name: 'reviewsDashboard',
    },
    isVisible: true,
  },
])
</script>

<template>
  <RoutesTabMenu :tabs="dashboardLayoutTabs" title="Dashboard" icon="lucide:layout-dashboard" />
</template>
