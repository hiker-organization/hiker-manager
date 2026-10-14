<script setup lang="ts">
import type { ClassValue } from 'vue'

const props = withDefaults(
  defineProps<{
    label?: string
    disabled?: boolean
    checkedClass?: ClassValue
    uncheckedClass?: ClassValue
    checkedIcon?: string
    uncheckedIcon?: string
  }>(),
  {
    checkedClass: 'bg-success/25 border-success text-success',
    uncheckedClass: 'bg-error/25 border-error text-error',
    checkedIcon: 'lucide:check',
    uncheckedIcon: 'lucide:x',
    disabled: false,
  },
)

const isChecked = defineModel<boolean>('isChecked', {
  default: false,
})
</script>

<template>
  <!-- https://daisyui.com/components/toggle/ -->
  <div class="w-full flex items-center justify-between gap-4">
    <span v-if="props.label" class="font-bold">{{ props.label }}</span>
    <label :class="[{ 'pointer-events-none': props.disabled }]">
      <input
        v-model="isChecked"
        :class="['toggle', isChecked ? props.checkedClass : props.uncheckedClass]"
        type="checkbox"
      />
    </label>
  </div>
</template>
