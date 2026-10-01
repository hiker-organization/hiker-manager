<script setup lang="ts">
import type { FormKitClasses } from '@formkit/core'

const props = withDefaults(
  defineProps<{
    classes: Record<string, string | Record<string, boolean> | FormKitClasses> | undefined
    disabled: boolean
  }>(),
  {
    disabled: false,
  },
)

const formValues = defineModel('form')
</script>

<template>
  <FormKit
    v-model="formValues"
    :classes="props.classes"
    :disabled="props.disabled"
    :actions="false"
    type="form"
  >
    <slot />
  </FormKit>
</template>
