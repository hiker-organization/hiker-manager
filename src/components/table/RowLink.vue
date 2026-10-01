<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router'

const props = defineProps<{
  route: RouteLocationNamedRaw
}>()
</script>

<template>
  <RouterLink :to="props.route" class="absolute top-0 bottom-0 left-0 right-0" />
</template>
