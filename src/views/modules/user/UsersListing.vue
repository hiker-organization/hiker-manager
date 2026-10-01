<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { onMounted, ref } from 'vue'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import { useUserStore } from '@/stores/modules/user/user-store'

const userStore = useUserStore()

const admins = ref<Array<User>>([])

const pagination = ref<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 1,
})

async function loadUsers() {
  const { data, statusCode } = await userStore.fetchAdmins(
    {
      page: '1',
      limit: '10',
    },
    {},
  )

  if (statusCode.value === 200 && data.value) {
    admins.value = data.value.data

    pagination.value = data.value.meta
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>

<template>
  <Table :columns="USER_TABLE_COLUMNS" :rows="admins" :pagination="pagination">
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
