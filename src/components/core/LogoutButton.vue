<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useLogout } from '@/composables/auth/use-logout'

// showLabel exibe o texto ao lado do ícone (sidebar expandida).

const props = withDefaults(
  defineProps<{
    showLabel?: boolean
  }>(),
  {
    showLabel: false,
  },
)

const { handleLogout } = useLogout()
</script>

<template>
  <div>
    <button
      data-cy="logout-button"
      title="Sair"
      :class="[
        'h-11 bg-white/10 flex items-center justify-center gap-2 rounded-full cursor-pointer transition-all duration-150 hover:bg-error',
        props.showLabel ? 'px-4' : 'w-11',
      ]"
      @click="handleLogout"
    >
      <Icon icon="lucide:log-out" class="size-6 text-white" />

      <span v-if="props.showLabel" class="text-white font-bold">Sair</span>
    </button>
  </div>
</template>
