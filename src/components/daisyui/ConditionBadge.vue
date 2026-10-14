<script setup lang="ts">
import type { ClassValue } from 'vue'

const props = withDefaults(
  defineProps<{
    value: boolean
    activeText?: string
    inactiveText?: string
    customClass?: ClassValue
    activeClass?: ClassValue
    inactiveClass?: ClassValue
  }>(),
  {
    activeText: 'Ativo',
    inactiveText: 'Inativo',
    customClass: 'badge-soft rounded-sm font-bold p-4',
    activeClass: 'badge-success',
    inactiveClass: 'badge-error',
  },
)
</script>

<template>
  <!-- https://daisyui.com/components/badge/ -->
  <div :class="['badge', props.customClass, props.value ? props.activeClass : props.inactiveClass]">
    {{ props.value ? props.activeText : props.inactiveText }}
  </div>
</template>
