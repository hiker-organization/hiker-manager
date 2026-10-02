<script setup lang="ts">
import { Icon } from '@iconify/vue'

type ToggleVariant =
  'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'

const props = withDefaults(
  defineProps<{
    label?: string
    variant?: ToggleVariant
    checkedIcon?: string
    uncheckedIcon?: string
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    checkedIcon: 'lucide:check',
    uncheckedIcon: 'lucide:x',
    disabled: false,
  },
)

const isChecked = defineModel<boolean>('isChecked', {
  default: false,
})

const toggleVariants: Record<ToggleVariant, string> = {
  primary: 'toggle-primary',
  secondary: 'toggle-secondary',
  accent: 'toggle-accent',
  info: 'toggle-info',
  success: 'toggle-success',
  warning: 'toggle-warning',
  error: 'toggle-error',
  neutral: 'toggle-neutral',
}
</script>

<template>
  <!-- https://daisyui.com/components/toggle/ -->
  <div class="w-full flex items-center justify-between gap-4">
    <span v-if="props.label" class="font-bold">{{ props.label }}</span>
    <label :class="['toggle', toggleVariants[props.variant]]">
      <input v-model="isChecked" :disabled="props.disabled" type="checkbox" />

      <!-- A ordem dos ícones importa. -->
      <Icon :icon="props.uncheckedIcon" aria-label="disabled" />
      <Icon :icon="props.checkedIcon" aria-label="enabled" />
    </label>
  </div>
</template>
