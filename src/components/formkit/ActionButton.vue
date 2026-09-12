<script setup lang="ts">
import type { FormKitClasses } from '@formkit/core'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  classes: Record<string, string | Record<string, boolean> | FormKitClasses> | undefined
  type: 'submit' | 'button'
  text?: string
  icon?: string
}>()


</script>

<template>
  <FormKit
    :classes="props.classes"
    :type="props.type"
  >
    <Icon v-show="props.icon" icon="lucide:log-in" />

    <span v-show="props.text">Entrar</span>
  </FormKit>
</template>
