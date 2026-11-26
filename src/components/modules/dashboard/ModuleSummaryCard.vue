<script setup lang="ts">
import type { ClassValue } from 'vue'

const props = defineProps<{
  label: string
  description?: string
  customClass?: ClassValue
  isLoading?: boolean
}>()
</script>

<template>
  <div
    :class="[
      'bg-base-100 flex flex-col items-start justify-between gap-6 rounded-box p-6',
      props.customClass,
    ]"
  >
    <p v-if="props.description" class="text-base text-base-content">
      {{ props.description }}
    </p>

    <!-- Exibido no lugar do valor enquanto os dados carregam. -->

    <div v-if="props.isLoading" class="skeleton h-12 w-24"></div>

    <span v-else class="text-5xl font-medium">
      {{ props.label }}
    </span>
  </div>
</template>
