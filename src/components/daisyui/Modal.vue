<script setup lang="ts">
const isVisible = defineModel('isVisible', {
  default: false
})
</script>

<template>
  <!-- https://daisyui.com/components/modal/ -->
  <dialog :open="isVisible" class="modal">
    <div class="modal-box bg-base-300 flex flex-col items-stretch justify-stretch gap-4 p-4">
      <div class="modal-action m-0">
        <form method="dialog">
          <Button
            variant="error"
            icon="lucide:x"
            @click="isVisible = false"
          />
        </form>
      </div>

      <slot />
    </div>
  </dialog>
</template>
