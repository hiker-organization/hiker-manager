<script setup lang="ts">
import type { ClassValue } from 'vue'
import type { FormKitClasses } from '@formkit/core'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  classes: Record<string, string | Record<string, boolean> | FormKitClasses> | undefined
  type: 'submit' | 'button'
  label: {
    text: string
    class?: ClassValue
  }
  icon: {
    name: string
    class?: ClassValue
  }
}>()
</script>

<template>
  <FormKit :classes="props.classes" :type="props.type">
    <Icon v-show="props.icon.name" :icon="props.icon.name" :class="[props.icon.class]" />

    <span v-show="props.label.text" :class="[props.label.class]">{{ props.label.text }}</span>
  </FormKit>
</template>
