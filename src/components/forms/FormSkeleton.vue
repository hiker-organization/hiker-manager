<script setup lang="ts">
// Cada item é uma seção do formulário, com a quantidade de campos que ela exibe.

const props = defineProps<{
  sections: Array<number>
}>()
</script>

<template>
  <FieldsContainer>
    <div
      v-for="(fields, sectionIndex) in props.sections"
      :key="sectionIndex"
      class="bg-base-200 rounded-md"
    >
      <div class="skeleton h-14 w-full rounded-md"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
        <div v-for="field in fields" :key="field" class="flex flex-col gap-2">
          <div class="skeleton h-4 w-32"></div>

          <div class="skeleton h-8 w-full"></div>
        </div>
      </div>
    </div>
  </FieldsContainer>
</template>
