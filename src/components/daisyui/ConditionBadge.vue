<script setup lang="ts">
type BadgeVariant =
  'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error' | 'neutral'

const props = withDefaults(
  defineProps<{
    value: boolean
    activeText?: string
    inactiveText?: string
    activeVariant?: BadgeVariant
    inactiveVariant?: BadgeVariant
  }>(),
  {
    activeText: 'Ativo',
    inactiveText: 'Inativo',
  },
)

const badgeVariants: Record<BadgeVariant, string> = {
  primary: 'badge-primary',
  secondary: 'badge-secondary',
  accent: 'badge-accent',
  info: 'badge-info',
  success: 'badge-success',
  warning: 'badge-warning',
  error: 'badge-error',
  neutral: 'badge-neutral',
}
</script>

<template>
  <div
    :class="[
      'badge badge-soft rounded-sm font-bold p-4',
      props.value
        ? badgeVariants[props.activeVariant || 'success']
        : badgeVariants[props.inactiveVariant || 'error'],
    ]"
  >
    {{ props.value ? props.activeText : props.inactiveText }}
  </div>
</template>
