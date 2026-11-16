<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const reviewCode = computed<number | null>(() => {
  const param = route.params.reviewCode

  if (!param) {
    return null
  }

  return Number(param)
})

const reviewReportsLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Listagem',
    icon: 'lucide:table',
    route: {
      name: 'reviewReportsListing',
    },
    isVisible: true,
  },
])
</script>

<template>
  <RoutesTabMenu
    :tabs="reviewReportsLayoutTabs"
    title="Denúncias"
    icon="lucide:message-circle-warning"
  >
    <template #description>
      <span class="text-lg"> Postagem: #{{ reviewCode }} </span>
    </template>
  </RoutesTabMenu>
</template>
