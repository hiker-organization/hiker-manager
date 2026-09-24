<script setup lang="ts">
import { computed } from 'vue'

type DropdownType = 'top' | 'bottom' | 'left' | 'right'

const props = withDefaults(
  defineProps<{
    type?: DropdownType
  }>(),
  {
    type: 'right',
  },
)

const containerMargin = computed<string>(() => {
  let type = ''

  switch (props.type) {
    case 'top':
      type = 'mb-2'
      break

    case 'bottom':
      type = 'mt-2'
      break

    case 'left':
      type = 'mr-2'
      break

    case 'right':
      type = 'ml-2'
      break
  }

  return type
})
</script>

<template>
  <!-- https://daisyui.com/components/dropdown/ -->
  <div :class="['dropdown', `dropdown-${props.type}`]">
    <GeneralButton label="Ações Disponíveis" icon="lucide:circle-ellipsis" variant="primary" />
    <div
      :class="[
        'dropdown-content bg-base-300 border border-base-content rounded-md p-2',
        containerMargin,
      ]"
    >
      <slot />
    </div>
  </div>
</template>
