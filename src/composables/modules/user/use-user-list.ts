import type { UserListRow } from '@/models/modules/user/user-model'
import type { Pagination } from '@/models/components/table/pagination-model'
import { ref } from 'vue'
import { useUserStore } from '@/stores/modules/user/user-store'
import { useUrlParamsManager } from '@/composables/navigation/use-url-params-manager'

export function useUserList() {
  const userStore = useUserStore()

  const namespace: string = 'users-list'

  const users = ref<Array<UserListRow>>([])

  const pagination = ref<Pagination>({
    page: 1,
    limit: 10,
    total: 0,
    total_pages: 1,
    sortable_fields: [],
  })

  // Começa verdadeiro, pois a primeira busca é disparada ao montar a listagem.

  const isLoading = ref<boolean>(true)

  const actionsModalIsVisible = ref<boolean>(false)

  const selectedUser = ref<UserListRow | null>(null)

  const { currentNamespaceQueryParams, setNamespaceQueryParams } = useUrlParamsManager({
    namespace,
    onNamespaceQueryParamsChange: loadUsers,
    immediate: true,
  })

  function openActionsModal(data: UserListRow) {
    selectedUser.value = data

    actionsModalIsVisible.value = true
  }

  async function loadUsers() {
    isLoading.value = true

    const { data, statusCode } = await userStore.fetchUsers(currentNamespaceQueryParams.value, {})

    isLoading.value = false

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
    isLoading,
    actionsModalIsVisible,
    selectedUser,
    openActionsModal,
    forceUsersListingReload,
    setNamespaceQueryParams,
  }
}
