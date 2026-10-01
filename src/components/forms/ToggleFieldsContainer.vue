<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'Configurações',
  },
)
</script>

<template>
  <div class="w-64 bg-base-300 flex flex-col items-start justify-stretch gap-4 rounded-md p-4">
    <h2 class="w-full text-lg text-center font-bold">{{ props.title }}</h2>

    <slot />
  </div>
</template>
