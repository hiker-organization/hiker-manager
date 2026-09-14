<script setup lang="ts">
import type { FormKitClasses } from '@formkit/core'

const props = defineProps<{
  classes: Record<string, string | Record<string, boolean> | FormKitClasses> | undefined
  type: string
  name: string
  label: string
}>()
</script>

<template>
  <FormKit :classes="props.classes" :type="props.type" :name="props.name" :label="props.label" />
</template>
