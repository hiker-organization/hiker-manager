<script setup lang="ts">
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
  <div class="w-full flex items-center justify-between gap-4">
    <span v-if="props.label">{{ props.label }}</span>
    <input v-model="isChecked" :class="['toggle', toggleVariants[props.variant]]" type="checkbox" />
  </div>
</template>
