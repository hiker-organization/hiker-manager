<script setup lang="ts">
import type { UserListingResponse } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { onMounted, ref } from 'vue'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useToast } from '@/composables/notify/toastify'

const userStore = useUserStore()

const { notify } = useToast()

const admins = ref<Array<UserListingResponse>>([])

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

async function blockUser(user: string) {
  const { statusCode } = await userStore.blockUser(
    {
      data: '2026-09-25', // Apenas para testes.
    },
    {},
    {
      user,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Usuário bloqueado com sucesso.')

    await loadUsers()
  }
}

async function unblockUser(user: string) {
  const { statusCode } = await userStore.unblockUser(
    {},
    {
      user,
    },
  )

  if (statusCode.value === 200) {
    notify.success('Usuário desbloqueado com sucesso.')

    await loadUsers()
  }
}

onMounted(async () => {
  await loadUsers()
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-start justify-stretch gap-4">
    <h1 class="text-lg font-bold">Listagem de Usuários</h1>

    <GeneralTable :columns="USER_TABLE_COLUMNS" :rows="admins" :pagination="pagination">
      <template #bloqueado="{ data }">
        <ConditionBadge
          :value="data['bloqueado']"
          activeText="Bloqueado"
          inactiveText="Desbloqueado"
          activeVariant="error"
          inactiveVariant="success"
        />
      </template>

      <template #registerActions="{ data }">
        <GeneralButton
          v-if="data['bloqueado']"
          label="Desbloquear"
          icon="lucide:lock-open"
          variant="success"
          @click="unblockUser(data['nome_usuario'])"
        />
        <GeneralButton
          v-else
          label="Bloquear"
          icon="lucide:lock"
          variant="error"
          @click="blockUser(data['nome_usuario'])"
        />
      </template>
    </GeneralTable>
  </div>
</template>
