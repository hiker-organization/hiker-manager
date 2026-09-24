<script setup lang="ts">
const props = withDefaults(defineProps<{
  value: boolean
  activeText?: string
  inactiveText?: string
}>(), {
  activeText: 'Ativo',
  inactiveText: 'Inativo',
})
</script>

<template>
  <div :class="[
    'badge badge-soft rounded-sm font-bold p-4',
    (props.value) ? 'badge-success' : 'badge-error',
  ]">
    {{ (props.value) ? props.activeText : props.inactiveText }}
  </div>
</template>
