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
  <div class="relative min-h-120 size-full bg-base-300 rounded-md p-4">
    <!--
      O gráfico é montado desde o início, pois o ApexCharts calcula a altura ("100%")
      ao ser criado. O skeleton fica por cima dele enquanto os dados carregam.
    -->

    <apexchart v-bind="$attrs" />

    <div v-if="props.isLoading" class="skeleton absolute inset-4"></div>
  </div>
</template>
