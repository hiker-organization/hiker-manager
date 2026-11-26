<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    isCurrentSelection?: boolean
  }>(),
  {
    isCurrentSelection: false,
  },
)

const isOpen = ref<boolean>(false)
</script>

<template>
  <div class="w-full flex flex-col items-start justify-stretch">
    <div
      :class="[
        'w-full flex items-center justify-between gap-2 rounded-lg p-2 cursor-pointer transition-all duration-150',
        props.isCurrentSelection
          ? 'bg-(--sidebar-active) text-white'
          : 'text-white/85 hover:bg-white/10 hover:text-white',
      ]"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center justify-start gap-2">
        <slot name="sectionTitle" />
      </span>

      <Icon
        :class="['transition-all duration-200', { 'rotate-180': isOpen }]"
        icon="lucide:chevron-down"
      />
    </div>

    <div
      v-show="isOpen"
      class="w-full flex flex-col items-start justify-stretch gap-1 mt-1 transition-all duration-250"
    >
      <slot name="subItems" />
    </div>
  </div>
</template>
