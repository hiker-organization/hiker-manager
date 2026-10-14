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
  sortable_fields: [],
})

const actionsModalIsVisible = ref<boolean>(false)

const selectedUser = ref<User | null>(null)

const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
  namespace,
  onNamespaceQueryParamsChange: async () => {
    const { data, statusCode } = await userStore.fetchAdmins(currentNamespaceQueryParams.value, {})

    if (statusCode.value === 200 && data.value) {
      admins.value = data.value.data

      pagination.value = {
        ...data.value.meta,
        sortable_fields: ['id', 'nome_exibicao', 'email'],
      }
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
      <template #reputacao="{ data }"> {{ data.reputacao }}% </template>

      <template #banido="{ data }">
        <ConditionBadge
          :value="data.banido === true"
          activeText="Sim"
          inactiveText="Não"
          activeClass="badge-error"
          inactiveClass="badge-success"
        />
      </template>

      <template #bloqueado="{ data }">
        <ConditionBadge
          :value="data.bloqueado === true"
          activeText="Sim"
          inactiveText="Não"
          activeClass="badge-error"
          inactiveClass="badge-success"
        />
      </template>

      <template #registerActions="{ data }">
        <Button label="Opções" icon="lucide:circle-ellipsis" @click="openActionsModal(data)" />
      </template>
    </Table>

    <Modal
      v-if="selectedUser"
      v-model:isVisible="actionsModalIsVisible"
      icon="lucide:user-2"
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
          class="w-full"
        >
          <Button
            label="Visualizar"
            icon="lucide:form"
            custom-class="btn-info w-full flex items-center justify-center gap-2 p-4"
          />
        </RouterLink>

        <BlockUserModal
          v-if="!selectedUser.bloqueado"
          :user="selectedUser"
          @block-processed="forceUsersListingReload"
        />
        <UnblockUserButton
          v-else
          :user="selectedUser"
          @unblock-processed="forceUsersListingReload"
        />

        <BanUserButton
          v-if="!selectedUser.banido"
          :user="selectedUser"
          @ban-processed="forceUsersListingReload"
        />
      </div>
    </Modal>
  </div>
</template>
