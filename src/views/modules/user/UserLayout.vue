<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const user = computed(() => route.params.user)

const userLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Listagem',
    icon: 'lucide:table',
    route: {
      name: 'usersListing',
    },
    isVisible: true,
  },
  {
    label: 'Detalhes',
    icon: 'lucide:form',
    route: {
      name: 'userForm',
      params: {
        user: user.value,
      },
    },
    isVisible: !!user.value,
  },
])
</script>

<template>
  <RoutesTabMenu :tabs="userLayoutTabs" />
</template>
