<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    title?: string
    icon?: string
  }>(),
  {
    title: 'Configurações',
    icon: 'lucide:settings',
  },
)
</script>

<template>
  <div class="w-64 bg-base-300 flex flex-col items-start justify-stretch gap-4 rounded-md p-4">
    <h2 class="w-full flex items-center justify-center gap-2 text-lg text-center font-extrabold">
      <icon :icon="props.icon" />
      {{ props.title }}
    </h2>

    <slot />
  </div>
</template>
