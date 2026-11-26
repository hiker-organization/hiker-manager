<script setup lang="ts">
// Lista os dados completos de um registro nos modais, sem cortar os textos.
// Itens que não são texto (badges, skeletons) entram pelo slot, com o DetailsItem.

const props = withDefaults(
  defineProps<{
    fields?: Array<{ label: string; value: string }>
  }>(),
  {
    fields: () => [],
  },
)
</script>

<template>
  <dl class="flex flex-col gap-2">
    <DetailsItem v-for="field in props.fields" :key="field.label" :label="field.label">
      {{ field.value }}
    </DetailsItem>

    <slot />
  </dl>
</template>
