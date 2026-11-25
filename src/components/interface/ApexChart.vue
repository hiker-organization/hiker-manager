<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    isLoading?: boolean
  }>(),
  {
    isLoading: false,
  },
)
</script>

<template>
  <div class="min-h-120 size-full bg-base-300 rounded-md p-4">
    <!-- Exibido enquanto os dados do gráfico carregam. -->

    <div v-if="props.isLoading" class="skeleton size-full min-h-112"></div>

    <apexchart v-else v-bind="$attrs" />
  </div>
</template>
