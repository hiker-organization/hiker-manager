<script setup lang="ts">
import type { UserListingResponse } from '@/models/modules/user/user-model'
import { onMounted, ref } from 'vue'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import { useUserStore } from '@/stores/modules/user/user-store'

const userStore = useUserStore()

const admins = ref<Array<UserListingResponse>>([])

onMounted(async () => {
  const { data, statusCode } = await userStore.fetchAdmins(
    {
      page: '1',
      limit: '10',
    },
    {},
  )

  if (statusCode.value === 200 && data.value) {
    admins.value = data.value.data
  }
})
</script>

<template>
  <div class="h-full w-full flex flex-col items-start justify-stretch gap-4">
    <h1 class="text-lg font-bold">Listagem de Usuários</h1>

    <GeneralTable :columns="USER_TABLE_COLUMNS" :rows="admins" />
  </div>
</template>
