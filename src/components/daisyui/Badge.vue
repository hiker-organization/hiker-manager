<script setup lang="ts">
import type { ClassValue } from 'vue'

const props = withDefaults(
  defineProps<{
    text: string
    customClass?: ClassValue
  }>(),
  {
    customClass: 'badge-soft rounded-sm font-bold p-4',
  },
)
</script>

<template>
  <!-- https://daisyui.com/components/badge/ -->
  <div :class="['badge', props.customClass]">
    {{ props.text }}
  </div>
</template>
