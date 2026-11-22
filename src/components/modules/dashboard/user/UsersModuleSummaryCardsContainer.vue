<script setup lang="ts">
import { useUsersModuleSummaryCardsResources } from '@/composables/modules/dashboard/user/use-users-module-summary-cards-resources'

const { usersModuleSummaryResponse } = useUsersModuleSummaryCardsResources()
</script>

<template>
  <div class="size-full bg-base-300 grid grid-cols-2 gap-4 rounded-md p-4">
    <ModuleSummaryCard
      :label="String(usersModuleSummaryResponse.totalUsers)"
      description="Total"
      custom-class="bg-info/20 border-info text-base-content"
    />

    <ModuleSummaryCard
      :label="String(usersModuleSummaryResponse.common.count)"
      description="Válido(s)"
      custom-class="bg-success/20 border-success text-base-content"
    />

    <ModuleSummaryCard
      :label="String(usersModuleSummaryResponse.blocked.count)"
      description="Bloqueado(s)"
      custom-class="bg-warning/20 border-warning text-base-content"
    />

    <ModuleSummaryCard
      :label="String(usersModuleSummaryResponse.banned.count)"
      description="Banido(s)"
      custom-class="bg-error/20 border-error text-base-content"
    />
  </div>
</template>
