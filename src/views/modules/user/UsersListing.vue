<script setup lang="ts">
import type { User } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

const userStore = useUserStore()

const namespace: string = 'users-list'

const admins = ref<Array<User>>([])

const pagination = ref<Pagination>({
  page: 1,
  limit: 10,
  total: 0,
  total_pages: 1,
})

const actionsModalIsVisible = ref<boolean>(false)

const selectedUser = ref<User | null>(null)

const {
  currentNamespaceQueryParams,
  setNamespaceQueryParams,
} = useUrlParamsManager({
  namespace,
  onNamespaceQueryParamsChange: async () => {
    const { data, statusCode } = await userStore.fetchAdmins(currentNamespaceQueryParams.value, {})

    if (statusCode.value === 200 && data.value) {
      admins.value = data.value.data

      pagination.value = data.value.meta
    }
  },
  immediate: true,
})

function openActionsModal(data: User) {
  selectedUser.value = data

  actionsModalIsVisible.value = true
}

async function forceUsersListingReload() {
  actionsModalIsVisible.value = false

  const { data, statusCode } = await userStore.fetchAdmins(currentNamespaceQueryParams.value, {})

  if (statusCode.value === 200 && data.value) {
    admins.value = data.value.data

    pagination.value = data.value.meta
  }
}
</script>

<template>
  <div class="w-full">
    <Table
      :namespace
      :columns="USER_TABLE_COLUMNS"
      :rows="admins"
      :pagination="pagination"
      @updateParams="(params) => setNamespaceQueryParams(params)"
    >
      <template #bloqueado="{ data }">
        <ConditionBadge
          :value="data['bloqueado'] === true"
          activeText="Bloqueado"
          inactiveText="Desbloqueado"
          activeClass="badge-error"
          inactiveClass="badge-success"
        />
      </template>

      <template #registerActions="{ data }">
        <Button
          label="Opções"
          icon="lucide:circle-ellipsis"
          @click="openActionsModal(data)"
        />
      </template>
    </Table>

    <Modal
      v-if="selectedUser"
      v-model:isVisible="actionsModalIsVisible"
      :title="`Ações (${selectedUser.nome_usuario})`"
    >
      <div class="grid grid-cols-2 gap-2">
        <RouterLink
          :to="{
            name: 'userForm',
            params: {
              user: String(selectedUser.nome_usuario),
            },
          }"
          class="w-full col-span-2"
        >
          <Button
            label="Visualizar"
            icon="lucide:user-2"
            custom-class="btn-info w-full flex items-center justify-center gap-2 p-4"
          />
        </RouterLink>

        <BlockUserModal
          v-if="selectedUser.bloqueado === false"
          :user="selectedUser"
          @block-processed="forceUsersListingReload"
        />
        <UnblockUserButton
          v-else
          :user="selectedUser"
          @unblock-processed="forceUsersListingReload"
        />

        <BanUserButton
          :user="selectedUser"
          @ban-processed="forceUsersListingReload"
        />
      </div>
    </Modal>
  </div>
</template>
