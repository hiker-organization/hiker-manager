<script setup lang="ts">
import { useUsersModuleSummaryCardsResources } from '@/composables/modules/dashboard/user/use-users-module-summary-cards-resources'

const { isLoading, usersModuleSummaryResponse } = useUsersModuleSummaryCardsResources()
</script>

<template>
  <div class="size-full grid grid-cols-1 gap-4 sm:grid-cols-2">
    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(usersModuleSummaryResponse.totalUsers)"
      description="Total"
      custom-class="text-info"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(usersModuleSummaryResponse.common.count)"
      description="Válido(s)"
      custom-class="text-success"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(usersModuleSummaryResponse.blocked.count)"
      description="Bloqueado(s)"
      custom-class="text-warning"
    />

    <ModuleSummaryCard
      :is-loading="isLoading"
      :label="String(usersModuleSummaryResponse.banned.count)"
      description="Banido(s)"
      custom-class="text-error"
    />
  </div>
</template>
