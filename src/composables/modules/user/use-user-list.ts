import type { UserLisRow } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

export function useUserList() {
  const userStore = useUserStore()

  const namespace: string = 'users-list'

  const users = ref<Array<UserLisRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  const actionsModalIsVisible = ref<boolean>(false)

  const selectedUser = ref<UserLisRow | null>(null)

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: loadUsers,
    immediate: true,
  })

  function openActionsModal(data: UserLisRow) {
    selectedUser.value = data

    actionsModalIsVisible.value = true
  }

  async function loadUsers() {
    const { data, statusCode } = await userStore.fetchUsers(currentNamespaceQueryParams.value, {})

    if (statusCode.value === 200 && data.value) {
      users.value = data.value.data

      pagination.value = {
        ...data.value.meta,
        sortable_fields: ['id', 'nome_exibicao', 'email'],
      }
    }
  }

  async function forceUsersListingReload() {
    actionsModalIsVisible.value = false

    await loadUsers()
  }

  return {
    namespace,
    users,
    pagination,
    actionsModalIsVisible,
    selectedUser,
    openActionsModal,
    forceUsersListingReload,
    setNamespaceQueryParams,
  }
}
