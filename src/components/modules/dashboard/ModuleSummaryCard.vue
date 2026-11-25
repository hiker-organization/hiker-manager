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
      'flex flex-col items-center justify-center gap-2 border rounded-md p-4',
      props.customClass,
    ]"
  >
    <!-- Exibido no lugar do valor enquanto os dados carregam. -->

    <div v-if="props.isLoading" class="skeleton h-10 w-16"></div>

    <span v-else class="text-4xl font-extrabold">
      {{ props.label }}
    </span>

    <p v-if="props.description" class="text-xl font-bold">
      {{ props.description }}
    </p>
  </div>
</template>
