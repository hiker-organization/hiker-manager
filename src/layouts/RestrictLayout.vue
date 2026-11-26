<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useLogout } from '@/composables/auth/use-logout'

const { handleLogout } = useLogout()
</script>

<template>
  <div class="size-full bg-base-200 flex flex-col items-center justify-center gap-8">
    <Icon icon="lucide:shield-alert" class="size-24 text-error" />

    <h2 class="text-xl font-extrabold text-center uppercase">
      Você não tem acesso aos recursos exigidos pela aplicação.
    </h2>

    <div class="flex items-center justify-center gap-4">
      <RouterLink
        :to="{
          name: 'home',
        }"
      >
        <Button label="Home" icon="lucide:home" />
      </RouterLink>

      <!-- Permite entrar com outra conta, já que a Home volta para cá sem permissão. -->

      <Button
        label="Sair"
        icon="lucide:log-out"
        custom-class="btn-error flex items-center justify-center gap-2 p-4"
        @click="handleLogout"
      />
    </div>
  </div>
</template>
