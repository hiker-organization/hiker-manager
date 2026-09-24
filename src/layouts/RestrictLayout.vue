<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div class="size-full flex flex-col items-center justify-center gap-4">
    <Icon icon="lucide:shield-alert" class="size-24 text-error" />

    <h2 class="text-xl font-extrabold text-center uppercase">
      Você não tem acesso aos recursos exigidos pela aplicação.
    </h2>
  </div>
</template>
