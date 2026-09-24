<script setup lang="ts">
import { Icon } from '@iconify/vue'

type ButtonType = 'default' | 'soft' | 'outline' | 'dash' | 'active' | 'ghost' | 'link'

type ButtonVariant =
  'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'

const props = withDefaults(
  defineProps<{
    label: string
    icon?: string
    type?: ButtonType
    variant?: ButtonVariant
    disabled?: boolean
  }>(),
  {
    type: 'default',
    variant: 'primary',
    disabled: false,
  },
)

const buttonTypes: Record<ButtonType, string> = {
  default: '',
  soft: 'btn-soft',
  outline: 'btn-outline',
  dash: 'btn-dash',
  active: 'btn-active',
  ghost: 'btn-ghost',
  link: 'btn-link',
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  accent: 'btn-accent',
  info: 'btn-info',
  success: 'btn-success',
  warning: 'btn-warning',
  error: 'btn-error',
  neutral: 'btn-neutral',
}
</script>

<template>
  <button
    :class="[
      'btn flex items-center justify-center gap-2',
      buttonTypes[props.type],
      buttonVariants[props.variant],
      { 'btn-disabled': props.disabled },
    ]"
  >
    <Icon v-if="props.icon" :icon="props.icon" />
    {{ props.label }}
  </button>
</template>
