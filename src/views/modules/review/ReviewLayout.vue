<script setup lang="ts">
import type { RouteTab } from '@/models/navigation/routes-tab-menu-model'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const reviewCode = computed(() => route.params.reviewCode)

const reviewLayoutTabs = computed<Array<RouteTab>>(() => [
  {
    label: 'Listagem',
    icon: 'lucide:table',
    route: {
      name: 'reviewsListing',
    },
    isVisible: true,
  },
  {
    label: 'Detalhes',
    icon: 'lucide:form',
    route: {
      name: 'reviewForm',
      params: {
        reviewCode: reviewCode.value,
      },
    },
    isVisible: !!reviewCode.value,
  },
])
</script>

<template>
  <RoutesTabMenu :tabs="reviewLayoutTabs" title="Postagens" icon="lucide:pencil-line" />
</template>
