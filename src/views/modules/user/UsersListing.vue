<script setup lang="ts">
import { useUserList } from '@/composables/modules/user/use-user-list'
import { USER_TABLE_COLUMNS } from '@/constants/modules/user/user-table-columns'
import Decimal from 'decimal.js'

const {
  namespace,
  users,
  pagination,
  isLoading,
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
      :is-loading="isLoading"
      @updateParams="(params) => setNamespaceQueryParams(params)"
    >
      <template #reputacao="{ data }">{{ Decimal(data.reputacao.toFixed(2)) }}%</template>

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

      <template #cardTitle="{ data }">
        <span class="font-extrabold truncate">#{{ data.id }} | {{ data.nome_usuario }}</span>
      </template>

      <template #registerActions="{ data }">
        <Button
          custom-class="btn-primary w-full flex items-center justify-center gap-2 p-4 md:w-auto"
          label="Opções"
          icon="lucide:sparkles"
          @click="openActionsModal(data)"
        />
      </template>
    </Table>

    <Modal
      v-if="selectedUser"
      v-model:isVisible="actionsModalIsVisible"
      :title="`Ações (#${selectedUser.id})`"
      icon="lucide:user-2"
    >
      <div class="grid grid-cols-1 gap-2 md:grid-cols-2">
        <RouterLink
          :to="{
            name: 'userForm',
            params: {
              user: selectedUser.nome_usuario,
            },
          }"
          class="w-full"
        >
          <Button
            label="Dados Completos"
            icon="lucide:form"
            custom-class="btn-info w-full flex items-center justify-center gap-2 p-4"
          />
        </RouterLink>

        <BlockUserModal
          v-if="!selectedUser.bloqueado && !selectedUser.banido"
          :user="selectedUser"
          @block-processed="forceUsersListingReload"
        />

        <UnblockUserButton
          v-if="selectedUser.bloqueado && !selectedUser.banido"
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
