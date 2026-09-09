<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { computed, ref, useTemplateRef } from 'vue'

const componentAnchor = useTemplateRef('anchor')

const isOpen = ref<boolean>(false)

const sidebarWidth = computed<string>(() => (isOpen.value ? 'w-64' : 'w-16'))

onClickOutside(componentAnchor, () => {
  isOpen.value = false
})
</script>

<template>
  <div
    ref="anchor"
    :class="['h-full bg-base-300 transition-all duration-200', sidebarWidth]"
    @click="isOpen = true"
  >
    <!--  -->
  </div>
</template>
