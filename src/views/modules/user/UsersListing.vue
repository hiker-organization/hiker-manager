<script setup lang="ts">
import { useUserList } from '@/composables/modules/user/use-user-list'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'

const {
  namespace,
  users,
  pagination,
  actionsModalIsVisible,
  selectedUser,
  openActionsModal,
  forceUsersListingReload,
  setNamespaceQueryParams,
} = useUserList()
</script>

<template>
  <div class="w-full">
    <Table
      :namespace
      :columns="USER_TABLE_COLUMNS"
      :rows="users"
      :pagination="pagination"
      @updateParams="(params) => setNamespaceQueryParams(params)"
    >
      <template #reputacao="{ data }">{{ data.reputacao }}%</template>

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
