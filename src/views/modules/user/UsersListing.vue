<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

const userStore = useUserStore()

const admins = ref<Array<User>>([])

const pagination = ref<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 1,
})

const {
  currentNamespaceQueryParams,
  setNamespaceQueryParams,
} = useUrlParamsManager({
  namespace: 'users-list',
  onNamespaceQueryParamsChange: async () => {
    const { data, statusCode } = await userStore.fetchAdmins(currentNamespaceQueryParams.value, {})

    if (statusCode.value === 200 && data.value) {
      admins.value = data.value.data

      pagination.value = data.value.meta
    }
  },
})
</script>

<template>
  <Table
    :columns="USER_TABLE_COLUMNS"
    :rows="admins"
    :pagination="pagination"
    @updateParams="(params) => setNamespaceQueryParams(params)"
  >
    <template #registerLink="{ data }">
      <RowLink
        :route="{
          name: 'userForm',
          params: {
            user: String(data['nome_usuario']),
          },
        }"
      />
    </template>

    <template #bloqueado="{ data }">
      <ConditionBadge
        :value="data['bloqueado'] === true"
        activeText="Bloqueado"
        inactiveText="Desbloqueado"
        activeVariant="error"
        inactiveVariant="success"
      />
    </template>
  </Table>
</template>
