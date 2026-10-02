<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    icon?: string
    openByDefault?: boolean
  }>(),
  {
    openByDefault: true,
  },
)

const isOpen = ref<boolean>(props.openByDefault)
</script>

<template>
  <div class="bg-base-200">
    <div
      class="w-full bg-base-100 flex items-center justify-between gap-4 border border-base-content/25 rounded-md p-4 cursor-pointer hover:border-base-content/75"
      @click="isOpen = !isOpen"
    >
      <span class="flex items-center justify-start gap-2 text-lg font-extrabold">
        <Icon v-if="props.icon" :icon="props.icon" />

        {{ props.label }}
      </span>

      <Icon
        icon="lucide:chevron-down"
        :class="['transition-all duration-250', { 'rotate-180': isOpen }]"
      />
    </div>

    <div
      v-show="isOpen"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4 transition-all duration-150'"
    >
      <slot />
    </div>
  </div>
</template>
