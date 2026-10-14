<script setup lang="ts">
import type { ClassValue } from 'vue'
import { Icon } from '@iconify/vue'

const props = withDefaults(
  defineProps<{
    label?: string
    icon?: string
    customClass?: ClassValue
    type?: 'button' | 'submit' | 'reset'
    disabled?: boolean
  }>(),
  {
    customClass: 'btn-primary flex items-center justify-center gap-2 p-4',
    type: 'button',
    disabled: false,
  },
)
</script>

<template>
  <!-- https://daisyui.com/components/button/ -->
  <button
    :class="['btn', { 'btn-disabled': props.disabled }, props.customClass]"
    :type="props.type"
  >
    <slot>
      <Icon v-if="props.icon" :icon="props.icon" />
      <span v-if="props.label">{{ props.label }}</span>
    </slot>
  </button>
</template>
