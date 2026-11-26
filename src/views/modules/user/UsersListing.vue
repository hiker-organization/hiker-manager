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
  detailsModalIsVisible,
  selectedUser,
  openActionsModal,
  openDetailsModal,
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

      <template #foto_url="{ data }">
        <img
          v-if="data.foto_url"
          :src="data.foto_url"
          :alt="`Foto de ${data.nome_usuario}`"
          class="size-10 rounded-full object-cover"
        />

        <span v-else class="truncate">Não Definido(a)</span>
      </template>

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
        <Button
          label="Dados Completos"
          icon="lucide:form"
          custom-class="btn-info w-full flex items-center justify-center gap-2 p-4"
          @click="openDetailsModal"
        />

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

    <Modal
      v-if="selectedUser"
      v-model:is-visible="detailsModalIsVisible"
      :title="`Usuário (#${selectedUser.id})`"
      icon="lucide:user-2"
    >
      <UserDetails :user="selectedUser" />
    </Modal>
  </div>
</template>
