interface AutorApiDTO {
  nome_usuario: string
}

interface LocaleApiDTO {
  cidade: string
  nome: string
  sigla_estado: string
}

interface ClassificationApiDTO {
  probabilidade: number
  modelo_versao: string
  revisado_em: string | null
  decisao_admin: AutoBlockModerationStats | null
  revisor: AutorApiDTO | null
}

export interface AutoBlockedReviewListRow {
  id?: number
  descricao: string
  status: AutoBlockModerationStats
  createdAt: string
  autor: AutorApiDTO
  lugar: LocaleApiDTO
  classificacao: ClassificationApiDTO
}

export type AutoBlockModerationStats = 'AUTORIZADA' | 'OFENSIVA'

// Tabelas exibidas na aba: pendentes, revisadas (liberadas ou mantidas) ou as duas.
export type AutoBlockedReviewFilterStats = 'TODAS' | 'PENDENTES' | 'REVISADAS'

export interface AutoBlockModerationParameters {
  status: AutoBlockModerationStats
}
