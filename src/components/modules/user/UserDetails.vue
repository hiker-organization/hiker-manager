<script setup lang="ts">
import type { UserListRow } from '@/models/modules/user/user-model'
import Decimal from 'decimal.js'
import { computed } from 'vue'
import { getNormalizedDate } from '@/utils/data/formatting/date-formatting-utils'

// Usuário completo. A linha da listagem já traz todos os campos, sem nova requisição.

const props = defineProps<{
  user: UserListRow
}>()

const NOT_DEFINED: string = 'Não Definido(a)'

const userFields = computed<Array<{ label: string; value: string }>>(() => {
  const { user } = props

  const fields = [
    { label: 'ID', value: String(user.id) },
    { label: 'Usuário', value: user.nome_usuario },
    { label: 'Nome', value: user.nome_exibicao },
    { label: 'Cargo', value: user.cargo === 'ADM' ? 'Administrador' : 'Usuário' },
    { label: 'E-mail', value: user.email },
    { label: 'Celular', value: user.numero_celular || NOT_DEFINED },
    {
      label: 'Data de Nascimento',
      value: user.data_nascimento ? getNormalizedDate(user.data_nascimento) : NOT_DEFINED,
    },
    { label: 'Reputação', value: `${Decimal(user.reputacao.toFixed(2))}%` },
    { label: 'Foto (URL)', value: user.foto_url ?? NOT_DEFINED },
    { label: 'Banido', value: user.banido ? 'Sim' : 'Não' },
    { label: 'Bloqueado', value: user.bloqueado ? 'Sim' : 'Não' },
  ]

  if (user.bloqueado && user.bloqueado_ate) {
    fields.push({ label: 'Expiração do Bloqueio', value: getNormalizedDate(user.bloqueado_ate) })
  }

  return fields
})
</script>

<template>
  <DetailsList :fields="userFields" />
</template>
