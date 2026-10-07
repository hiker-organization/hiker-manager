<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  label: string
  icon: string
}>()
</script>

<template>
  <div class="bg-base-200 flex flex-col items-stretch justify-stretch gap-2 rounded-md p-2">
    <span class="flex items-center justify-start gap-2 text-lg">
      <Icon :icon="props.icon" />
      {{ props.label }}
    </span>

    <slot />
  </div>
</template>
