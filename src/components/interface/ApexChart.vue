<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="size-full bg-base-300 rounded-md p-4">
    <apexchart v-bind="$attrs" />
  </div>
</template>
