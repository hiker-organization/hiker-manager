<script setup lang="ts">
const props = defineProps<{
  label: string
}>()
</script>

<template>
  <div class="bg-base-200 rounded-md p-2">
    <dt class="font-bold">{{ props.label }}</dt>
    <dd class="whitespace-normal break-words">
      <slot />
    </dd>
  </div>
</template>
