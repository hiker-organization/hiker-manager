<script setup lang="ts">
import type { FormKitClasses } from '@formkit/core'

const props = defineProps<{
  classes: Record<string, string | Record<string, boolean> | FormKitClasses> | undefined
}>()

const formValues = defineModel('form')
</script>

<template>
  <FormKit
    v-model="formValues"
    :classes="props.classes"
    :actions="false"
    type="form"
  >
    <slot />
  </FormKit>
</template>
