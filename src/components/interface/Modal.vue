<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  title: string
  icon?: string
}>()

const isVisible = defineModel('isVisible', {
  default: false,
})
</script>

<template>
  <Teleport to="body">
    <!-- https://daisyui.com/components/modal/ -->
    <dialog :open="isVisible" class="modal" @click="isVisible = false">
      <div
        class="modal-box bg-base-300 flex flex-col items-stretch justify-stretch gap-4 p-4"
        @click.stop
      >
        <div class="modal-action w-full flex items-center justify-between gap-4 m-0">
          <div class="flex items-center justify-start gap-2">
            <Icon v-if="props.icon" :icon="props.icon" />
            <span class="text-lg font-bold">{{ props.title }}</span>
          </div>

          <form method="dialog">
            <Button
              custom-class="size-8 bg-error/50 rounded-full hover:bg-error"
              @click="isVisible = false"
            >
              <span>
                <Icon icon="lucide:x" class="size-4" />
              </span>
            </Button>
          </form>
        </div>

        <slot />
      </div>
    </dialog>
  </Teleport>
</template>
